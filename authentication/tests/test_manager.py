from authentication.models import User
from rest_framework.test import APITestCase
from authentication.manager import CustomUserManager


class TestManager(APITestCase):
    def setUp(self):
        self.manager = CustomUserManager()

    def test_manager_raises_error_no_username(self):
        self.assertRaises(
            TypeError, self.manager.create_user, None, "fakePassword", "fakeEmail"
        )

    def test_manager_raises_error_no_password(self):
        self.assertRaises(
            TypeError, self.manager.create_user, "fakeUser", None, "fakeEmail"
        )

    def test_manager_raises_error_no_email(self):
        self.assertRaises(
            TypeError, self.manager.create_user, "fakeUser", "fakePassword", None
        )

    def test_manager_sets_isStaff_isSuperuser_properly(self):
        user = User.objects.create_superuser(
            username="fakeUser", password="fakePassword", email="fakeEmail@gmail.com"
        )

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
