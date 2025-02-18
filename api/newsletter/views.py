from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber
from core.models import SystemLog
from .serializers import SubscriberSerializer

@api_view(["POST"])
def subscribe(request):
    """
    Subscribe to the newsletter and log the activity.
    Expected JSON Body:
    - email (str): Email to subscribe.
    """
    serializer = SubscriberSerializer(data=request.data)
    if serializer.is_valid():
        subscriber = serializer.save()

        # Log the subscription event
        SystemLog.objects.create(
            user=None,  # No user object, so we log email instead
            module="Newsletter",
            relate_id=subscriber.id,
            description=f"Subscribed to the newsletter: {subscriber.email}"
        )

        return Response({"message": "Subscription successful!"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(["POST"])
def unsubscribe(request):
    """
    Unsubscribe from the newsletter and log the activity.
    Expected JSON Body:
    - email (str): Email to unsubscribe.
    """
    email = request.data.get("email")
    try:
        subscriber = Subscriber.objects.get(email=email)
        subscriber.delete()

        # Log the unsubscription event
        SystemLog.objects.create(
            user=None,  
            module="Newsletter",
            relate_id=subscriber.id,
            description=f"Unsubscribed from the newsletter: {email}"
        )

        return Response({"message": "Successfully unsubscribed!"}, status=200)
    except Subscriber.DoesNotExist:
        return Response({"error": "Email not found in the subscription list."}, status=404)

@api_view(["GET"])
def list_subscribers(request):
    """
    List all newsletter subscribers (Admin use).
    """
    subscribers = Subscriber.objects.all()
    serializer = SubscriberSerializer(subscribers, many=True)
    return Response(serializer.data)