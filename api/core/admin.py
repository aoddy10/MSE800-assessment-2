from django.contrib import admin
from .models import Item  # Import your model

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")  # Columns to display in admin panel
    search_fields = ("name",)  # Enable search