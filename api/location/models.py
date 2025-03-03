from django.db import models
from django.contrib.auth import get_user_model
from city.models import City  # ✅ Reference to City model

User = get_user_model()

class Location(models.Model):
    LOCATION_TYPES = [
        ("restaurant", "Restaurant"),
        ("activity", "Activity"),
    ]

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=LOCATION_TYPES)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    cover_image_url = models.URLField(blank=True, null=True)
    open_hour_detail = models.TextField(blank=True, null=True)
    location_url = models.URLField(blank=True, null=True)
    menu_url = models.URLField(blank=True, null=True)
    price_per_person = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    avg_rating = models.FloatField(default=0.0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    @property
    def price_range(self):
        """Calculate price range based on price_per_person"""
        if self.price_per_person is None:
            return None
        elif self.price_per_person <= 40:
            return "low"
        elif 41 <= self.price_per_person <= 100:
            return "medium"
        else:
            return "high"


class Gallery(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="gallery")
    image_url = models.URLField()

    def __str__(self):
        return f"Image for {self.location.title}"