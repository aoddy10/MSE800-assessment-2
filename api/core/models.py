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
    
class SystemLog(models.Model):
    id = models.AutoField(primary_key=True)  # PK และ Auto Generate
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # ผู้ใช้ที่เกี่ยวข้อง
    module = models.CharField(max_length=100)  # โมดูลที่เกี่ยวข้อง เช่น "User"
    relate_id = models.IntegerField(null=True, blank=True)  # ID ของข้อมูลที่เกี่ยวข้อง
    description = models.TextField()  # คำอธิบายของเหตุการณ์
    created_at = models.DateTimeField(auto_now_add=True)  # เวลาที่บันทึก Log

    def __str__(self):
        return f"{self.module} - {self.description} ({self.created_at})"