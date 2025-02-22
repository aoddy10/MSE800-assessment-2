from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.models import SystemLog, User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "phone", "role", "profile_image_url", "is_suspended", "last_login"]
        

class SystemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemLog
        fields = "__all__"