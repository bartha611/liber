import jwt
from .models import User
from Liber import settings
from rest_framework import authentication, exceptions


class JWTAuth(authentication.BaseAuthentication):
    auth_prefix = "Bearer"

    def authenticate(self, request):
        header = authentication.get_authorization_header(request).split()

        if not header:
            return None
        elif len(header) == 1 or len(header) > 2:
            return None

        # decode token because it is in bytes
        prefix = header[0].decode("utf-8")
        token = header[1].decode("utf-8")

        if prefix.lower() != self.auth_prefix.lower():
            return None

        return self._authenticate_token(token)

    def _authenticate_token(self, token):
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

        try:
            user = User.objects.get(pk=payload["id"])
        except User.DoesNotExist:
            raise exceptions.ValidationError("Could not decode token")

        if not user.is_active:
            raise exceptions.ValidationError("User is no longer active")

        return (user, token)
