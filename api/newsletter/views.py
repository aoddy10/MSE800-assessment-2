from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber
from core.models import SystemLog
from .serializers import SubscriberSerializer
from django.core.mail import send_mail
from django.conf import settings

@api_view(["POST"])
def subscribe(request):
    """
    Subscribe to the newsletter, send confirmation email, and log the activity.
    Expected JSON Body:
    - email (str): Email to subscribe.
    """
    serializer = SubscriberSerializer(data=request.data)
    
    if serializer.is_valid():
        subscriber = serializer.save()

        # Send confirmation email
        subject = "Newsletter Subscription Confirmation"
        message = (
            f"Hello,\n\n"
            f"Thank you for subscribing to our newsletter! We are excited to keep you updated with the latest news.\n\n"
            f"If you did not subscribe, please ignore this email.\n\n"
            f"Best Regards,\nKiwi Explorer Team"
        )
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [subscriber.email]

        try:
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        except Exception as e:
            return Response({"error": "Failed to send confirmation email", "details": str(e)}, status=500)

        # Log the subscription event
        SystemLog.objects.create(
            user=None,  # No user object, so we log email instead
            module="Newsletter",
            relate_id=subscriber.id,
            description=f"Subscribed to the newsletter: {subscriber.email}"
        )

        return Response({"message": "Subscription successful! A confirmation email has been sent."}, status=201)

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