from rest_framework import serializers
from authentication.models import User
from authentication.factory import UserFactory
from authentication.serializer import (
    LoginSerializer,
    RegistrationSerializer,
    UserSerializer,
)
from rest_framework.test import APITestCase


class TestLoginSerializer(APITestCase):
    def setUp(self):
        self.user = UserFactory.create(
            username="fakeUser", email="fakeEmail1@gmail.com", password="fakePassword"
        )

    def test_login_serializer_validate(self):
        data = {"email": "fakeEmail1@gmail.com", "password": "fakePassword"}
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())

        userObject = UserSerializer(self.user)

        self.assertEquals(serializer.data["user"], userObject.data)

    def test_error_when_no_email_is_provided(self):
        data = {"password": "fakePassword"}
        serializer = LoginSerializer(data=data)

        self.assertFalse(serializer.is_valid())

    def test_error_when_no_password_provided(self):
        data = {"email": "fakeEmail1@gmail.com"}
        serializer = LoginSerializer(data=data)

        self.assertFalse(serializer.is_valid())
