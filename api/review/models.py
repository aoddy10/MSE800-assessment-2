from django.db import models
from django.contrib.auth import get_user_model
from location.models import Location
from city.models import City
from core.models import SystemLog

User = get_user_model()

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="reviews")
    review = models.TextField()
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.location.title}"

    def save(self, *args, **kwargs):
        """Override save method to update avg_rating for Location & City when a review is added or updated."""
        super().save(*args, **kwargs)

        # Update Location's average rating
        self.update_location_avg_rating()

        # Update City's average rating
        self.update_city_avg_rating()

        # Log the review creation
        SystemLog.objects.create(
            user=self.user,
            module="Review",
            relate_id=self.id,
            description=f"User {self.user.username} reviewed {self.location.title} with rating {self.rating}."
        )

    def update_location_avg_rating(self):
        """Update avg_rating of the location based on all its reviews."""
        reviews = self.location.reviews.all()
        avg_rating = sum(r.rating for r in reviews) / reviews.count() if reviews else 0
        self.location.avg_rating = avg_rating
        self.location.save()

    def update_city_avg_rating(self):
        """Update avg_rating of the city based on all locations' avg_rating."""
        city = self.location.city
        locations = city.location_set.all()
        avg_rating = sum(loc.avg_rating for loc in locations) / locations.count() if locations else 0
        city.avg_rating = avg_rating
        city.save()