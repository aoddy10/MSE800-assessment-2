from rest_framework_api_key.models import APIKey
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get("Authorization")
        if not api_key:
            raise AuthenticationFailed("API Key is required")

        api_key = api_key.replace("Api-Key ", "").strip()

        if not APIKey.objects.filter_from_key(api_key).exists():
            raise AuthenticationFailed("Invalid API Key")

        return (None, None)  # No specific user, just authentication