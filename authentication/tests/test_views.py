from authentication.models import User
from authentication.serializer import LoginSerializer, UserSerializer
from authentication.factory import UserFactory
from rest_framework.test import APITestCase
from rest_framework import status


class TestLoginView(APITestCase):
    def setUp(self):
        self.user = UserFactory.create(
            username="fakeUsername",
            email="fakeEmail@gmail.com",
            password="fakePassword",
        )

    def test_can_login_user(self):
        url = f"/api/user/login"
        data = {"email": "fakeEmail@gmail.com", "password": "fakePassword"}
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_cannot_login_with_wrong_data(self):
        url = "/api/user/login"
        data = {"email": "fakeEmail@gmail.com", "password": "fakePassword1"}
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
