from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, register, login, logout
from .views import password_reset_request, password_reset_confirm

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("password-reset-request/", password_reset_request, name="password_reset_request"),
    path("password-reset-confirm/", password_reset_confirm, name="password_reset_confirm"),
]
