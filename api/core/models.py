from django.contrib.auth.models import AbstractUser
from django.db import models
import os
from django.core.files.storage import default_storage

class User(AbstractUser):
    ROLE_CHOICES = [
        ("user", "User"),
        ("business", "Business"),
        ("admin", "Admin"),
    ]

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    profile_image_url = models.URLField(blank=True, null=True)
    is_suspended = models.BooleanField(default=False)
    last_login = models.DateTimeField(blank=True, null=True)
    reset_token = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class SystemLog(models.Model):
    id = models.AutoField(primary_key=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    module = models.CharField(max_length=100)
    relate_id = models.IntegerField(null=True, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.module} - {self.description} ({self.created_at})"
    
class UploadedImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/")  # Store images under "media/uploads/"
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.image.url}"
    
    def delete(self, *args, **kwargs):
        """Override delete method to remove the image file from storage"""
        if self.image:
            # Remove the file from the filesystem
            if default_storage.exists(self.image.name):
                default_storage.delete(self.image.name)
        super().delete(*args, **kwargs)
        
