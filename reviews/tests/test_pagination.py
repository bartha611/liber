from unittest.mock import patch
from reviews.models import Review
from rest_framework.test import APITestCase
from authentication.factory import UserFactory
from books.factories import BookFactory
from comments.factories import CommentFactory
from reviews.factories import ReviewFactory
from reviews.serializer import BasicReviewSerializer


class TestPagination(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.otherUser = UserFactory.create()
        self.book = BookFactory.create(id="fakeId")
        self.otherBook = BookFactory.create(id="fakeId2")
        self.review = ReviewFactory.create(user=self.user, book=self.book, rating=5)
        self.url = f"/api/books/{self.book.id}/reviews"
        self.secondUrl = "/api/books/fakeId3/reviews"

    def test_returns_valid_userReview(self):
        response = self.client.get(
            self.url, HTTP_AUTHORIZATION=f"Bearer {self.user.token}"
        )

        review = Review.objects.select_related("user").get(
            book=self.book, user=self.user
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["total_pages"], 1)
        self.assertEqual(
            response.data["userReview"], BasicReviewSerializer(review).data
        )

    def test_returns_no_valid_userReview(self):
        response = self.client.get(
            self.url, HTTP_AUTHORIZATION=f"Bearer {self.otherUser.token}"
        )

        self.assertEqual(response.data["userReview"], None)

    @patch("reviews.pagination.getBook")
    def test_returns_valid_book_if_not_exists_database(self, mock_get):
        mock_get.return_value = "book"

        response = self.client.get(self.secondUrl)

        self.assertEqual(response.data["book"], "book")

    @patch("reviews.pagination.getBook")
    def test_raise_NotFound_if_getBook_is_None(self, mock_get):
        mock_get.return_value = None

        response = self.client.get(self.secondUrl)

        self.assertEqual(response.status_code, 404)
