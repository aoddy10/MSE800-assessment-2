from rest_framework import serializers
from .models import Location, Gallery


        
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = "__all__"
        
class GalleryInLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ["id", "image_url"]
        
class LocationSerializer(serializers.ModelSerializer):
    gallery = GalleryInLocationSerializer(many=True, read_only=True)  # Include related images
    price_range = serializers.ReadOnlyField()  # Add computed field
    city_name = serializers.SerializerMethodField() # Add city name
    class Meta:
        model = Location
        fields = "__all__"
    
    def get_city_name(self, obj):
        return obj.city.title if obj.city else None