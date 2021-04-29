from rest_framework import serializers
from rest_framework.exceptions import ValidationError
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

        self.assertRaises(ValidationError, serializer.validate, data)

    def test_error_when_no_password_provided(self):
        data = {"email": "fakeEmail1@gmail.com"}
        serializer = LoginSerializer(data=data)

        self.assertFalse(serializer.is_valid())

        self.assertRaises(ValidationError, serializer.validate, data)


class TestRegistrationSerializer(APITestCase):
    def test_create_registration_serializer(self):
        serializer = RegistrationSerializer(
            data={
                "email": "fakeEmail2@gmail.com",
                "password": "fakePassword",
                "username": "fakeUser1",
            }
        )
        self.assertTrue(serializer.is_valid())
        serializer.save()

        userObject = User.objects.filter(email="fakeEmail2@gmail.com")
        self.assertNotEquals(userObject, {})
