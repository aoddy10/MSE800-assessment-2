from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Location,Gallery
from .serializers import LocationSerializer, GallerySerializer
from core.models import SystemLog

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
    Create a new location and log the activity.
    """
    serializer = LocationSerializer(data=request.data)
    if serializer.is_valid():
        location = serializer.save()
        
        # Log the creation of the location
        SystemLog.objects.create(
            user=location.user, 
            module="Location",
            relate_id=location.id,
            description=f"Created location: {location.title}"
        )

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["PUT"])
def update_location(request, location_id):
    """
    Update an existing location and log the activity.
    """
    try:
        location = Location.objects.get(id=location_id)
    except Location.DoesNotExist:
        return Response({"error": "Location not found"}, status=404)

    serializer = LocationSerializer(location, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()

        # Log the update of the location
        SystemLog.objects.create(
            user=location.user, 
            module="Location",
            relate_id=location.id,
            description=f"Updated location: {location.title}"
        )

        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
def delete_location(request, location_id):
    """
    Delete a location and log the activity.
    """
    try:
        location = Location.objects.get(id=location_id)
        location.delete()

        # Log the deletion of the location
        SystemLog.objects.create(
            user=location.user, 
            module="Location",
            relate_id=location.id,
            description=f"Deleted location: {location.title}"
        )

        return Response({"message": "Location deleted successfully"}, status=204)
    except Location.DoesNotExist:
        return Response({"error": "Location not found"}, status=404)
    
    
@api_view(["GET"])
def get_gallery(request, location_id):
    """
    Retrieve all images for a specific location.
    """
    images = Gallery.objects.filter(location_id=location_id)
    serializer = GallerySerializer(images, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def add_image(request):
    """
    Add a new image to a location and log the activity.
    """
    serializer = GallerySerializer(data=request.data)
    if serializer.is_valid():
        image = serializer.save()

        # Log the creation of an image
        SystemLog.objects.create(
            user=image.location.user, 
            module="Gallery",
            relate_id=image.id,
            description=f"Added image to location: {image.location.title} ({image.image_url})"
        )

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
def delete_image(request, image_id):
    """
    Delete an image and log the activity.
    """
    try:
        image = Gallery.objects.get(id=image_id)
        location = image.location
        image.delete()

        # Log the deletion of an image
        SystemLog.objects.create(
            user=location.user, 
            module="Gallery",
            relate_id=image.id,
            description=f"Deleted image from location: {location.title}"
        )

        return Response({"message": "Image deleted successfully"}, status=204)
    except Gallery.DoesNotExist:
        return Response({"error": "Image not found"}, status=404)