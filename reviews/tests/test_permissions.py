from unittest.mock import MagicMock
from django.contrib.auth.models import AnonymousUser
from django.test import TestCase
from django.test.client import RequestFactory
from reviews.permissions import ReviewPermission
from reviews.views import ReviewView
from authentication.factory import UserFactory


class TestCommentPermission(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = UserFactory.create(email="fakeEmail@gmail.com")
        self.otherUser = UserFactory.create(email="fakeEmail2@gmail.com")

    def test_has_object_permission(self):
        permission = ReviewPermission()
        obj = MagicMock()
        obj.user = self.user
        for request in ["get", "options", "head"]:
            req = getattr(self.factory, request)("/")
            req.user = AnonymousUser()
            self.assertTrue(
                permission.has_object_permission(req, ReviewView.as_view(), obj)
            )
        request = self.factory.post("/")
        request.user = AnonymousUser()
        self.assertFalse(
            permission.has_object_permission(request, ReviewView.as_view(), obj)
        )
