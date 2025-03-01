from django.contrib import admin

# display the Newsletter model in the admin panel
from .models import Subscriber

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at")  
    search_fields = ("email",)  
    list_filter = ("subscribed_at",) 
    ordering = ("-subscribed_at",) 