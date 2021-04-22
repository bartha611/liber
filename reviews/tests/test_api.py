from books.models import Book
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from reviews.factories import Review, ReviewFactory
from books.factories import BookFactory
from authentication.factory import UserFactory

# Create your tests here.


class CreateNewReview(TestCase):
    def setUp(self):
        # create review
        self.user = UserFactory.create(email="adambarth611@gmail.com")
        self.otherUser = UserFactory.create()
        self.book = BookFactory.create()
        self.review = ReviewFactory.create(user=self.user, book=self.book)

    def test_get_review(self):
        response = self.client.get(
            "/api/books/fakeBookId/reviews/{}".format(self.review.pk)
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_update_review(self):
        data = {"review": "fakeReview"}
        url = f"/api/reviews/{self.review.pk}"
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user.token}")
        response = client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_otheruser_cannot_update_review(self):
        data = {"review": "Another fake Review"}
        url = f"/api/reviews/{self.review.pk}"
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.otherUser.token}")
        response = client.patch(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_otheruser_cannot_delete_review(self):
        url = f"/api/reviews/{self.review.pk}"
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.otherUser.token}")
        response = client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_delete_review(self):
        url = f"/api/books/fakeBookId/reviews/{self.review.pk}"
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user.token}")
        response = client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
