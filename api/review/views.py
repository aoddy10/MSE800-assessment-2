from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Review
from .serializers import ReviewSerializer

@api_view(["GET"])
def get_reviews(request):
    """
    Retrieve reviews with optional filtering by user, location, city,
    sorting by newest, and limiting results.
    
    Query Parameters:
    - user (int): Filter reviews by user ID.
    - location (int): Filter reviews by location ID.
    - city (int): Filter reviews by city ID.
    - limit (int): Number of reviews to return (optional).
    """
    # Get query parameters
    user_id = request.GET.get("user")
    location_id = request.GET.get("location")
    city_id = request.GET.get("city")
    limit = request.GET.get("limit")

    # Start with all reviews
    reviews = Review.objects.all()

    # Apply filters
    if user_id:
        reviews = reviews.filter(user_id=user_id)
    if location_id:
        reviews = reviews.filter(location_id=location_id)
    if city_id:
        reviews = reviews.filter(location__city_id=city_id)

    # Order by newest first
    reviews = reviews.order_by("-created_at")

    # Apply limit if provided
    if limit and limit.isdigit():
        reviews = reviews[:int(limit)]

    # Serialize and return filtered reviews
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def create_review(request):
    """
    Create a new review for a location.
    Expected JSON Body:
    - user (int): ID of the user submitting the review.
    - location (int): ID of the location being reviewed.
    - review (str): The text content of the review.
    - rating (float): The rating score (1-5).
    """
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)