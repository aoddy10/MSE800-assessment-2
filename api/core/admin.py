from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, SystemLog

    
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ["id", "username", "email", "role", "is_active", "is_staff"]
    list_filter = ["role", "is_active", "is_staff"]
    fieldsets = UserAdmin.fieldsets + (
        ("Custom Fields", {"fields": ("role",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Custom Fields", {"fields": ("role",)}),
    )

admin.site.register(User, CustomUserAdmin)

class SystemLogsAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "module", "relate_id", "description", "created_at")
    search_fields = ("user__username", "module", "description")
    ordering = ("-created_at",)
admin.site.register(SystemLog, SystemLogsAdmin)

