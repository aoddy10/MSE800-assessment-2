from django.contrib.auth.models import AbstractUser
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

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

    def __str__(self):
        return f"{self.username} ({self.role})"