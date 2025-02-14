from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "location", "rating", "created_at")
    list_filter = ("rating", "location", "user")
    search_fields = ("user__username", "location__title", "review")
    ordering = ("-created_at",)