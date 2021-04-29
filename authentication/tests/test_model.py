from rest_framework.test import APITestCase
from authentication.factory import UserFactory


class TestUserModel(APITestCase):
    def test_str_method(self):
        user = UserFactory.create(email="fakeEmail@gmail.com")

        self.assertEquals(str(user), "fakeEmail@gmail.com")
