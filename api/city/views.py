from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import City
from .serializers import CitySerializer

# Get all cities
@api_view(["GET"])
def get_cities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)

# Get one city
@api_view(["GET"])
def get_city(request, city_id):
    try:
        city = City.objects.get(id=city_id)
        serializer = CitySerializer(city)
        return Response(serializer.data)
    except City.DoesNotExist:
        return Response({"error": "City not found"}, status=404)

# Create city
@api_view(["POST"])
def create_city(request):
    serializer = CitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# Update city
@api_view(["PUT"])
def update_city(request, city_id):
    try:
        city = City.objects.get(id=city_id)
    except City.DoesNotExist:
        return Response({"error": "City not found"}, status=404)

    serializer = CitySerializer(city, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Delete city
@api_view(["DELETE"])
def delete_city(request, city_id):
    try:
        city = City.objects.get(id=city_id)
        city.delete()
        return Response({"message": "City deleted successfully"}, status=204)
    except City.DoesNotExist:
        return Response({"error": "City not found"}, status=404)