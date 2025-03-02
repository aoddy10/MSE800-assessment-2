from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Contact
from core.models import SystemLog
from .serializers import ContactSerializer

@api_view(["POST"])
@permission_classes([AllowAny])
def submit_contact(request):
    """
    API endpoint to submit a contact form.
    Fields: name, email, organization_name, subject, message
    """
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        contact = serializer.save()

        # Send confirmation email to user
        send_mail(
            subject="Your contact request has been received",
            message=f"Hello {contact.name},\n\nThank you for reaching out. We have received your message:\n\n{contact.message}\n\nWe will get back to you as soon as possible.\n\nBest Regards,\nKiwi Explorer Team",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact.email],
            fail_silently=False,
        )

        # Notify admin
        send_mail(
            subject=f"New Contact Request from {contact.name}",
            message=f"Name: {contact.name}\nEmail: {contact.email}\nOrganization: {contact.organization_name}\nSubject: {contact.subject}\nMessage: '{contact.message}'",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],  # Replace with admin email
            fail_silently=False,
        )

        # Log the event
        SystemLog.objects.create(
            user=None,  # No authenticated user
            module="Contact",
            relate_id=contact.id,
            description=f"New contact request from {contact.name} ({contact.email})"
        )

        return Response({"message": "Contact request submitted successfully"}, status=201)

    return Response(serializer.errors, status=400)