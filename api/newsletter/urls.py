from django.urls import path
from .views import subscribe, unsubscribe, list_subscribers

urlpatterns = [
    path("subscribe/", subscribe, name="subscribe"),
    path("unsubscribe/", unsubscribe, name="unsubscribe"),
    path("list/", list_subscribers, name="list_subscribers"),
]