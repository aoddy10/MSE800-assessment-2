from django.urls import path
from .views import get_cities, get_city, create_city, update_city, delete_city

urlpatterns = [
    path("", get_cities, name="get_cities"),
    path("<int:city_id>/", get_city, name="get_city"),
    path("create/", create_city, name="create_city"),
    path("<int:city_id>/update/", update_city, name="update_city"),
    path("<int:city_id>/delete/", delete_city, name="delete_city"),
]