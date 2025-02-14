from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Location
from .serializers import LocationSerializer

from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Location
from .serializers import LocationSerializer

@api_view(["GET"])
def get_locations(request):
    """
    Retrieve all locations with optional filtering by user, city, type, search text (title only), and minimum rating.
    Query Parameters:
    - user (int): Filter locations by user ID.
    - city (int): Filter locations by city ID.
    - type (str): Filter locations by type ('restaurant' or 'activity').
    - search (str): Search locations by title only.
    - min_rating (float): Filter locations with a rating greater than or equal to the given value.
    """
    # Get query parameters from the request
    user_id = request.GET.get("user")
    city_id = request.GET.get("city")
    location_type = request.GET.get("type")
    search_text = request.GET.get("search")
    min_rating = request.GET.get("min_rating")

    # Start with all locations
    locations = Location.objects.all()

    # Apply filters based on query parameters (if provided)
    if user_id:
        locations = locations.filter(user_id=user_id)
    if city_id:
        locations = locations.filter(city_id=city_id)
    if location_type:
        locations = locations.filter(type=location_type)
    if search_text:
        locations = locations.filter(title__icontains=search_text)  # Search only in title
    if min_rating:
        locations = locations.filter(avg_rating__gte=min_rating)

    # Serialize and return filtered data
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_location(request, location_id):
    """
    Retrieve a single location by its ID.
    """
    try:
        # Fetch the location by ID
        location = Location.objects.get(id=location_id)
        serializer = LocationSerializer(location)
        return Response(serializer.data)
    except Location.DoesNotExist:
        # Return an error if location is not found
        return Response({"error": "Location not found"}, status=404)

@api_view(["POST"])
def create_location(request):
    """
    Create a new location with the provided data.
    Expected JSON Body:
    - user (int): ID of the user who owns the location.
    - city (int): ID of the city where the location is situated.
    - type (str): Type of the location ('restaurant' or 'activity').
    - title (str): Name of the location.
    - description (str, optional): Description of the location.
    - contact_email (str, optional): Email contact for the location.
    - contact_phone (str, optional): Phone contact for the location.
    - cover_image_url (str, optional): URL of the location's cover image.
    - open_hour_detail (str, optional): Opening hours description.
    - location_url (str, optional): Google Maps or external location link.
    - menu_url (str, optional): Link to the menu (for restaurants).
    - price_per_person (float, optional): Approximate cost per person.
    - avg_rating (float, optional): Average rating of the location.
    - is_active (bool, optional): Status of the location (active/inactive).
    """
    # Deserialize request data and validate it
    serializer = LocationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["PUT"])
def update_location(request, location_id):
    """
    Update an existing location by its ID.
    Partial updates are allowed (only send the fields to be updated).
    """
    try:
        # Fetch the location by ID
        location = Location.objects.get(id=location_id)
    except Location.DoesNotExist:
        return Response({"error": "Location not found"}, status=404)

    # Deserialize request data and validate it for update
    serializer = LocationSerializer(location, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
def delete_location(request, location_id):
    """
    Delete a location by its ID.
    """
    try:
        # Fetch the location by ID
        location = Location.objects.get(id=location_id)
        location.delete()
        return Response({"message": "Location deleted successfully"}, status=204)
    except Location.DoesNotExist:
        return Response({"error": "Location not found"}, status=404)