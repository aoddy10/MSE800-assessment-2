from django.urls import path
from .views import get_reviews, create_review

urlpatterns = [
    path("", get_reviews, name="get_reviews"),  # Supports filtering via query params
    path("create/", create_review, name="create_review"),
]