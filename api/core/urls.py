from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register, login, logout, validate_token, password_reset_request, password_reset_confirm
from .views import get_users, get_user, update_user, delete_user, toggle_suspend_user, get_me
from .views import upload_image, delete_uploaded_image

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("validate-token/", validate_token, name="validate_token"),
    path("password-reset-request/", password_reset_request, name="password_reset_request"),
    path("password-reset-confirm/", password_reset_confirm, name="password_reset_confirm"),
    # users
    path("me/", get_me, name="get_me"),
    path("users/", get_users, name="get_users"),
    path("users/<int:user_id>/", get_user, name="get_user"),
    path("users/<int:user_id>/update/", update_user, name="update_user"),
    path("users/<int:user_id>/delete/", delete_user, name="delete_user"),
    path("users/<int:user_id>/toggle-suspend/", toggle_suspend_user, name="toggle_suspend_user"),
    # Image
    path("upload-image/", upload_image, name="upload_image"),
    path("upload-image/<int:id>/delete", delete_uploaded_image, name="delete_uploaded_image"),
    
]
