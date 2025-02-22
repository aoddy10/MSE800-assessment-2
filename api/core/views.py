import uuid
from .models import SystemLog
from django.utils.timezone import now
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import send_mail
from django.conf import settings
from .serializers import UserSerializer, SystemLogSerializer
from .models import UploadedImage
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


User = get_user_model()  # use custom Model User

# Custom permission check: Only users with role = "admin" can access
def is_admin_role(user):
    """Check if the user has an admin role."""
    return user.is_authenticated and user.role == "admin"

# Function to check if user is admin or business
def is_admin_or_business(user):
    """Check if the user has an admin and business role."""
    return user.is_authenticated and user.role in ["admin", "business"]

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
    
    # create system log
    SystemLog.objects.create(
        user=user,
        module="User",
        relate_id=user.id,
        description=f"Registered new user: {username} ({email})"
    )

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

@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get("email")

    # check if email is existing
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "Email not found"}, status=404)

    # create Token for Reset Password
    reset_token = str(uuid.uuid4())
    user.reset_token = reset_token
    user.save()

    # create URL for Reset Password
    reset_link = f"http://localhost:3000/reset-password/{reset_token}"

    # send email to user
    subject = "Password Reset Request"
    message = f"Hello {user.username},\n\nClick the link below to reset your password:\n\n{reset_link}\n\nBest Regards,\nKiwi Explorer"
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

    # create Log
    SystemLog.objects.create(
        user=user,
        module="User",
        relate_id=user.id,
        description="Requested password reset"
    )

    return Response({"message": "Password reset email sent"}, status=200)

@api_view(["POST"])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    reset_token = request.data.get("reset_token")
    new_password = request.data.get("new_password")

    # check if Token is correct
    user = User.objects.filter(reset_token=reset_token).first()
    if not user:
        return Response({"error": "Invalid or expired reset token"}, status=400)

    # update new password
    user.set_password(new_password)
    user.reset_token = None  # clear token
    user.save()

    # create Log
    SystemLog.objects.create(
        user=user,
        module="User",
        relate_id=user.id,
        description="Reset password successfully"
    )

    return Response({"message": "Password has been reset successfully"}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def validate_token(request):
    """
    API endpoint to validate if the token is still active.
    """
    return Response({"message": "Token is valid"}, status=200)


# =============================================================
# Users Endpoint
# =============================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_me(request):
    """
    Retrieve the authenticated user's profile details.
    """
    user = request.user  # Get the currently authenticated user

    # Serialize the user data manually
    user_data = {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone": user.phone,
        "role": user.role,
        "profile_image_url": request.build_absolute_uri(user.profile_image_url) if user.profile_image_url else None,
        "is_suspended": user.is_suspended,
        "last_login": user.last_login.strftime("%Y-%m-%d %H:%M:%S") if user.last_login else None,
    }

    return Response(user_data)

# Get all users
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_users(request):
    if not is_admin_role(request.user):
        return Response({"error": "Permission denied"}, status=403)

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Get a single user by ID
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request, user_id):
    if not is_admin_role(request.user):
        return Response({"error": "Permission denied"}, status=403)

    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

# Update user details
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user(request, user_id):
    if not is_admin_role(request.user):
        return Response({"error": "Permission denied"}, status=403)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()

        # Log the update action
        SystemLog.objects.create(
            user=request.user,
            module="User",
            relate_id=user.id,
            description=f"Updated user: {user.username}"
        )

        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Delete a user
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    if not is_admin_role(request.user):
        return Response({"error": "Permission denied"}, status=403)

    try:
        user = User.objects.get(id=user_id)
        user.delete()

        # Log the delete action
        SystemLog.objects.create(
            user=request.user,
            module="User",
            relate_id=user_id,
            description=f"Deleted user: {user.username}"
        )

        return Response({"message": "User deleted successfully"}, status=204)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

# Toggle suspend user (Activate/Deactivate account)
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_suspend_user(request, user_id):
    """
    Toggle the suspension status of a user (Only accessible by admin role).
    
    - Admin users can suspend or unsuspend other users.
    - A log entry is created for every action performed.
    """
    if not is_admin_role(request.user):
        return Response({"error": "Permission denied"}, status=403)

    try:
        # Retrieve user from the database
        user = User.objects.get(id=user_id)

        # Toggle suspension status
        user.is_suspended = not user.is_suspended
        user.save()

        # Determine action performed
        action = "suspended" if user.is_suspended else "unsuspended"

        # Log the action in system logs
        SystemLog.objects.create(
            user=request.user,
            module="User",
            relate_id=user.id,
            description=f"{action.capitalize()} user: {user.username}"
        )

        return Response({"message": f"User {action} successfully"}, status=200)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    

# =============================================================
# Upload image Endpoint
# =============================================================

# Maximum file size (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    """
    API endpoint to upload an image (Only admin or business users, Max size: 10MB).
    Generates a unique filename using UUID to prevent duplicate file names.
    """
    if not is_admin_or_business(request.user):
        return Response({"error": "Permission denied"}, status=403)

    image = request.FILES.get("image")
    if not image:
        return Response({"error": "No image provided"}, status=400)

    # Check file size limit (10MB)
    if image.size > MAX_FILE_SIZE:
        return Response({"error": "File size exceeds the maximum limit of 10MB."}, status=400)

    # Generate a unique filename using UUID
    file_extension = image.name.split(".")[-1]  # Get file extension
    unique_filename = f"{uuid.uuid4()}.{file_extension}"  # Append UUID
    file_path = f"uploads/{request.user.id}/{unique_filename}"  # Save under user directory

    # Save image to storage
    saved_path = default_storage.save(file_path, ContentFile(image.read()))
    
    # Generate file URL
    file_url = request.build_absolute_uri(f"/media/{saved_path}")

    # Save record in database
    uploaded_image = UploadedImage.objects.create(user=request.user, image=saved_path)

    # Log the image upload
    SystemLog.objects.create(
        user=request.user,
        module="UploadedImage",
        relate_id=uploaded_image.id,
        description=f"Uploaded image: {file_url}"
    )

    return Response({"image_url": file_url}, status=201)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_uploaded_image(request):
    """
    API endpoint to delete an uploaded image (Only admin or business users).
    Requires the image URL in the request body.
    """
    if not is_admin_or_business(request.user):
        return Response({"error": "Permission denied"}, status=403)

    image_url = request.data.get("image_url")

    if not image_url:
        return Response({"error": "Image URL is required"}, status=400)

    # Extract file path from URL
    file_path = image_url.split("/media/")[-1]  # Extract the relative path

    try:
        image = UploadedImage.objects.get(image=file_path, user=request.user)
    except UploadedImage.DoesNotExist:
        return Response({"error": "Image not found"}, status=404)

    # Log image deletion
    SystemLog.objects.create(
        user=request.user,
        module="UploadedImage",
        relate_id=image.id,
        description=f"Deleted image: {image.image.url}"
    )

    # Delete the image file from storage
    image.image.delete()  # Deletes the file from media storage
    image.delete()  # Deletes the DB record

    return Response({"message": "Image deleted successfully"}, status=204)


# =============================================================
# System Logs Endpoint
# =============================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_system_logs(request):
    """
    Retrieve system logs with optional filters:
    - `limit` (int): Number of logs to retrieve.
    - `sort_order` (str): Sorting order ('asc' or 'desc').
    - `user_id` (int): Filter by user ID.

    Example:
    `/api/system-logs/?limit=10&sort_order=desc&user_id=1&location_id=5&rating=4.5`
    """
    # Retrieve query parameters
    limit = request.GET.get("limit")
    sort_order = request.GET.get("sort_order", "desc")
    user_id = request.GET.get("user_id")

    # Start with all logs
    logs = SystemLog.objects.all()

    # Apply filters if provided
    if user_id:
        logs = logs.filter(user_id=user_id)

    # Apply sorting order
    if sort_order == "asc":
        logs = logs.order_by("created_at")
    else:
        logs = logs.order_by("-created_at")

    # Apply limit if provided
    if limit:
        logs = logs[: int(limit)]

    # Serialize and return logs
    serializer = SystemLogSerializer(logs, many=True)
    return Response(serializer.data)