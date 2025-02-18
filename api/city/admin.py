from django.contrib import admin
from .models import City

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "is_active", "rating") 
    list_filter = ("is_active",)  
    search_fields = ("title", "description") 