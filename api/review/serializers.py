from rest_framework import serializers
from .models import Review
from core.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class UserBasicSerializer(serializers.ModelSerializer):
    """Serializer for exposing limited user details in Review"""
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "profile_image_url"]
        
class ReviewSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)  # Ensure user is an object, not just an ID
    
    class Meta:
        model = Review
        fields = ["id", "location", "review", "rating", "created_at", "user"]
        read_only_fields = ["user"]  # Prevent sending user_id manually