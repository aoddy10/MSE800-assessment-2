from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, register, login, logout

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
]
