from django.contrib import admin
from .models import Item  # Import your model
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")  # Columns to display in admin panel
    search_fields = ("name",)  # Enable search
    
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("id", "username", "email", "role", "is_suspended", "last_login")
    search_fields = ("username", "email", "role")
    ordering = ("id",)

admin.site.register(User, CustomUserAdmin)