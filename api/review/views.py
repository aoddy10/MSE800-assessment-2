from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Review
from .serializers import ReviewSerializer
from core.models import SystemLog

@api_view(["GET"])
def get_reviews(request):
    """
    Retrieve reviews with optional filtering by user, location, city,
    minimum rating, sorting, and limiting results.

    Query Parameters:
    - user (int): Filter reviews by user ID.
    - location (int): Filter reviews by location ID.
    - city (int): Filter reviews by city ID.
    - min_rating (float): Filter reviews with rating greater than or equal to this value.
    - limit (int): Number of reviews to return (optional).
    - sort_order (str): Sorting order ('asc' for oldest first, 'desc' for newest first).
    """
    user_id = request.GET.get("user")
    location_id = request.GET.get("location")
    city_id = request.GET.get("city")
    min_rating = request.GET.get("min_rating")
    limit = request.GET.get("limit")
    sort_order = request.GET.get("sort_order", "desc")  # Default to newest first

    reviews = Review.objects.all().select_related("user")  # Optimize query for user data

    if user_id:
        reviews = reviews.filter(user_id=user_id)
    if location_id:
        reviews = reviews.filter(location_id=location_id)
    if city_id:
        reviews = reviews.filter(location__city_id=city_id)
    if min_rating:
        try:
            min_rating = float(min_rating)
            reviews = reviews.filter(rating__gte=min_rating)
        except ValueError:
            return Response({"error": "Invalid min_rating value"}, status=400)

    if sort_order == "asc":
        reviews = reviews.order_by("created_at")
    else:
        reviews = reviews.order_by("-created_at")

    if limit and limit.isdigit():
        reviews = reviews[:int(limit)]

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_review(request):
    """
    Create a new review for a location (Only authenticated users).
    Expected JSON Body:
    - location (int): ID of the location being reviewed.
    - review (str): The text content of the review.
    - rating (float): The rating score (1-5).
    """
    data = request.data.copy()
    data["user"] = request.user.id  # Set the logged-in user as the review owner

    serializer = ReviewSerializer(data=data)
    
    if serializer.is_valid():
        review = serializer.save()

        # Log review creation in system logs
        SystemLog.objects.create(
            user=request.user,
            module="Review",
            relate_id=review.id,
            description=f"User {request.user.username} added a review for Location ID {review.location.id} with rating {review.rating}"
        )

        return Response(serializer.data, status=201)
    
    return Response(serializer.errors, status=400)