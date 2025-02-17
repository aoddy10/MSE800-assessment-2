from django.contrib import admin
from .models import Location

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "type", "city", "user", "is_active", "avg_rating")
    list_filter = ("type", "city", "is_active")
    search_fields = ("title", "description", "contact_email", "contact_phone")

admin.site.site_header = "Kiwi Explorer Admin"
admin.site.site_title = "Kiwi Explorer Admin Portal"
admin.site.index_title = "Welcome to Kiwi Explorer Admin"