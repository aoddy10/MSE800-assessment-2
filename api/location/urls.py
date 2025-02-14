from django.urls import path
from .views import get_locations, get_location, create_location, update_location, delete_location

urlpatterns = [
    path("", get_locations, name="get_locations"),
    path("<int:location_id>/", get_location, name="get_location"),
    path("create/", create_location, name="create_location"),
    path("<int:location_id>/update/", update_location, name="update_location"),
    path("<int:location_id>/delete/", delete_location, name="delete_location"),
]