from rest_framework import serializers
from .models import Review
from core.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class UserBasicSerializer(serializers.ModelSerializer):
    """
    Serializer for returning basic user information.
    """
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class ReviewSerializer(serializers.ModelSerializer):
    """
    Review Serializer including user information.
    """
    user = UserBasicSerializer(read_only=True)  # Include user details

    class Meta:
        model = Review
        fields = ["id", "user", "location", "review", "rating", "created_at"]