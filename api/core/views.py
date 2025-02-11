from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_api_key.permissions import HasAPIKey

# user authentication
# ----------------------------------------------
@api_view(["POST"])
@permission_classes([AllowAny])  # ✅ ไม่ต้องใช้ API Key
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({"message": "User registered successfully"}, status=201)

@api_view(["POST"])
@permission_classes([AllowAny])  # ✅ ไม่ต้องใช้ API Key
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=200)

@api_view(["POST"])
def logout(request):
    request.auth.delete()  # ลบ Token ของผู้ใช้
    return Response({"message": "Logged out successfully"}, status=200)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
