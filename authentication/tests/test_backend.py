from Liber import settings
from django.test import RequestFactory
import jwt
from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from authentication.backend import JWTAuth
from authentication.factory import UserFactory


class TestBackend(APITestCase):
    def setUp(self):
        self.url = "fakeUrl"
        self.fakeJWTToken = jwt.encode(
            {"id": 200000}, settings.SECRET_KEY, algorithm="HS256"
        )
        self.loginCredentials = {
            "email": "fakeEmail@gmail.com",
            "password": "fakePassword",
        }
        self.user = UserFactory.create(**self.loginCredentials)
        self.factory = RequestFactory()
        self.backend = JWTAuth()

    def test_backend_works(self):
        auth_header = f"Bearer {self.user.token}"

        request = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header
        )

        self.assertIsNotNone(self.backend.authenticate(request))

        self.assertEquals(
            self.backend.authenticate(request),
            (self.user, self.user.token),
        )

    def test_backend_returns_None_wrong_header(self):
        auth_header = f"{self.user.token}"
        auth_header_2 = f"Bearer Bearer {self.user.token}"

        request = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header
        )
        request2 = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header_2
        )

        self.assertIsNone(self.backend.authenticate(request))
        self.assertIsNone(self.backend.authenticate(request2))

    def test_backend_returns_None_wrong_prefix(self):
        auth_header = f"dumber {self.user.token}"

        request = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header
        )

        self.assertIsNone(self.backend.authenticate(request))

    def test_backend_raises_exception_no_user(self):
        auth_header = f"Bearer {self.fakeJWTToken}"

        request = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header
        )

        self.assertRaises(ValidationError, self.backend.authenticate, request)

    def test_backend_raises_exception_wrong_token(self):
        auth_header = f"Bearer fakeToken"

        request = self.factory.get(
            self.url, self.loginCredentials, HTTP_AUTHORIZATION=auth_header
        )

        self.assertRaises(ValidationError, self.backend.authenticate, request)