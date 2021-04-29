from django.db.models.query import Prefetch
from books.models import Book
from unittest.mock import patch
from django.db.models import Subquery
from django.db.models.aggregates import Avg, Count
from django.db.models.expressions import OuterRef
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from authentication.factory import UserFactory
from books.factories import BookFactory
from reviews.models import Review
from reviews.factories import ReviewFactory
from reviews.serializer import ReviewDetailSerializer, ReviewSerializer
from comments.models import Comment
from comments.factories import CommentFactory


class BookReviews(APITestCase):
    def setUp(self):
        # create book
        self.user = UserFactory.create(email="fakeEmail@gmail.com")
        self.otherUser = UserFactory.create(email="fakeEmail2@gmail.com")
        self.thirdUser = UserFactory.create(email="fakeEmail3@gmail.com")
        self.book = BookFactory.create(id="fakeBookId1")
        self.otherBook = BookFactory.create(id="fakeBookId2")
        self.firstReview = ReviewFactory.create(book=self.book, user=self.user)
        self.secondReview = ReviewFactory.create(book=self.book, user=self.otherUser)
        self.fakeUrl = "/api/books/fakeId3/reviews"

    def test_accurate_get_response(self):
        url = f"/api/books/{self.book.id}/reviews"
        reviews = (
            Review.objects.filter(book=self.book)
            .annotate(
                total_comments=Subquery(
                    Comment.objects.filter(review=OuterRef("pk"))
                    .values("review")
                    .annotate(count=Count("pk"))
                    .values("count")
                )
            )
            .prefetch_related("comments", "comments__user")
            .order_by("-id")
        )
        serializer = ReviewSerializer(reviews, many=True)
        response = self.client.get(url)

        self.assertEquals(serializer.data, response.data["results"])

    def test_cannot_create_with_fake_book(self):
        url = f"/api/books/fakeBookId/reviews"
        data = {"rating": 4}
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_a_new_review(self):
        url = f"/api/books/{self.otherBook.id}/reviews"
        data = {"rating": 5}
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user.token}")
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

        reviewObject = Review.objects.get(user=self.user, book=self.otherBook)
        serializer = ReviewDetailSerializer(reviewObject)

        self.assertEquals(serializer.data, response.data)

    def test_cannot_create_another_review(self):
        url = f"/api/books/{self.book.id}/reviews"
        data = {"review": "fakeReview", "rating": 5}
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.user.token}")
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_error_when_nonexistent_book_is_provided(self):
        url = f"/api/books/fakeId/reviews"
        response = self.client.get(url)
        self.assertEquals(response.status_code, status.HTTP_404_NOT_FOUND)

    @patch("reviews.views.getBook")
    def test_create_book_is_None(self, mock_get):
        mock_get.return_value = None

        response = self.client.post(self.fakeUrl)

        self.assertEqual(response.status_code, 400)

    @patch("reviews.views.getBook")
    def test_book_is_created_valid_getBook(self, mock_get):
        mock_get.return_value = {
            "id": "fakeId4",
            "authors": "fakeAuthor",
            "title": "fakeTitle",
        }

        response = self.client.post(
            "/api/books/fakeId4/reviews",
            {"rating": 5},
            HTTP_AUTHORIZATION=f"Bearer {self.thirdUser.token}",
        )
        book = Book.objects.filter(id="fakeId4").first()

        self.assertIsNotNone(book)
        self.assertEqual(response.status_code, 201)


class ReviewView(APITestCase):
    def setUp(self):
        self.book = BookFactory.create()
        self.user = UserFactory.create(email="fakeEmail@gmail.com")
        self.otherUser = UserFactory.create(email="fakeEmail2@gmail.com")
        self.review = ReviewFactory.create(book=self.book, user=self.user)
        self.otherReview = ReviewFactory.create(book=self.book, user=self.otherUser)
        self.url = "/api/reviews"
        CommentFactory.create(review=self.review, user=self.user)

    def test_get_queryset_sorting(self):
        response = self.client.get(f"{self.url}?sort=comments")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["id"], self.review.pk)

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["id"], self.otherReview.pk)


class TestReviewDetail(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.book = BookFactory.create()
        self.review = ReviewFactory.create(user=self.user, book=self.book)
        self.data = {"rating": 5}
        self.url = f"/api/reviews/{self.review.pk}"

    def test_get_authenticators(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        response = self.client.patch(self.url, self.data)

        self.assertEqual(response.status_code, 403)

    def test_destroy(self):
        response = self.client.delete(
            self.url, HTTP_AUTHORIZATION=f"Bearer {self.user.token}"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["id"], self.review.pk)
