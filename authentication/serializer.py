from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from rest_framework import serializers, exceptions
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
        ]


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, max_length=255, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "token", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return {"email": user.email, "username": user.username, "token": user.token}


class LoginSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, write_only=True)
    email = serializers.EmailField(write_only=True)
    user = UserSerializer(read_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            raise exceptions.ValidationError("Email needs to be provided")

        if password is None:
            raise exceptions.ValidationError("Password needs to be supplied")

        user = authenticate(email=email, password=password)

        if user is None:
            raise ValidationError("Email and/or password not valid")

        return {"user": user, "token": user.token}
