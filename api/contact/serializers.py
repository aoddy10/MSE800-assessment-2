from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

    def validate_email(self, value):
        """Validate email format"""
        if not "@" in value or not "." in value:
            raise serializers.ValidationError("Invalid email format.")
        return value