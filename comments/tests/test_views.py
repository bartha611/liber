from authentication.serializer import UserSerializer
from django.core.exceptions import ValidationError
from django.http.response import Http404
from rest_framework.test import APIRequestFactory, APITestCase
from reviews.factories import ReviewFactory
from books.factories import BookFactory
from comments.factories import CommentFactory
from authentication.factory import UserFactory
from comments.views import CommentView


class TestCommentView(APITestCase):
    def setUp(self):
        self.totalComments = 26
        self.user = UserFactory.create()
        self.book = BookFactory.create()
        self.review = ReviewFactory(book=self.book, user=self.user)
        for k in range(self.totalComments):
            CommentFactory.create(review=self.review, user=self.user)
        self.data = {"comment": "fakeComment"}
        self.url = f"/api/reviews/{self.review.pk}/comments"
        self.invalidUrl = f"/api/reviews/2/comments"
        self.detailUrl = f"/api/reviews/{self.review.pk}/comments/1"
        self.fakeDetailUrl = f"/api/reviews/{self.review.pk}/comments/30"

    def test_get_authenticators(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        response = self.client.post(self.url, self.data)

        self.assertEqual(response.status_code, 400)

    def test_get_queryset(self):
        # raise error invalid review

        response = self.client.get(self.invalidUrl)

        self.assertEqual(response.status_code, 404)

    def test_perform_create(self):
        # raises 404 invalid url

        response = self.client.post(
            self.invalidUrl, self.data, HTTP_AUTHORIZATION=f"Bearer {self.user.token}"
        )

        self.assertEqual(response.status_code, 404)

        # test when it works

        response = self.client.post(
            self.url, self.data, HTTP_AUTHORIZATION=f"Bearer {self.user.token}"
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["user"], UserSerializer(self.user).data)

    def test_commentDetail_MultipleFieldsMixin(self):
        response = self.client.get(self.detailUrl)

        self.assertEqual(response.status_code, 200)

        # raise 404 with fake comment id

        response = self.client.get(self.fakeDetailUrl)

        self.assertEqual(response.status_code, 404)
