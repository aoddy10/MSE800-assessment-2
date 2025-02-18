from django.urls import path
from .views import get_locations, get_location, create_location, update_location, delete_location, get_gallery, add_image, delete_image

urlpatterns = [
    path("", get_locations, name="get_locations"),
    path("<int:location_id>/", get_location, name="get_location"),
    path("create/", create_location, name="create_location"),
    path("<int:location_id>/update/", update_location, name="update_location"),
    path("<int:location_id>/delete/", delete_location, name="delete_location"),
    path("<int:location_id>/gallery/", get_gallery, name="get_gallery"),
    path("gallery/add/", add_image, name="add_image"),
    path("gallery/<int:image_id>/delete/", delete_image, name="delete_image"),
]