from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
from django.utils.timezone import now
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_api_key.permissions import HasAPIKey
from django.core.mail import send_mail
from django.conf import settings


User = get_user_model()  # use custom Model User

# user authentication
# ----------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")
    
    # validate data
    if not email or not username or not password:
        return Response({"error": "Please provide all the fields"}, status=400)
    if len(password) < 8:
        return Response({"error": "Password must be at least 8 characters"}, status=400)
    if len(username) < 3:
        return Response({"error": "Username must be at least 3 characters"}, status=400)

    # check if username and email have been used before
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    # create new user
    user = User.objects.create_user(username=username, email=email, password=password)
    
    # send confirmation email
    subject = "Welcome to Kiwi Explorer Platform!"
    message = f"Hello {username},\n\nThank you for registering with us. We are excited to have you on board!\n\nBest Regards,\nKiwi Explorer Developer Team."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)

    return Response({"message": "User registered successfully. A confirmation email has been sent."}, status=201)

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    # get user authentication
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    # check if user is suspended
    if user.is_suspended:
        return Response({"error": "Your account is suspended"}, status=403)

    # update last_login
    user.last_login = now()
    user.save()

    # create or pull Token ของ User
    token, _ = Token.objects.get_or_create(user=user)

    # send User detail with Token
    return Response({
        "token": token.key,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "role": user.role,
            "profile_image_url": user.profile_image_url,
            "is_suspended": user.is_suspended,
            "last_login": user.last_login.strftime("%Y-%m-%d %H:%M:%S") if user.last_login else None
        }
    }, status=200)

@api_view(["POST"])
def logout(request):
    request.auth.delete()  # delete Token of user
    return Response({"message": "Logged out successfully"}, status=200)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
