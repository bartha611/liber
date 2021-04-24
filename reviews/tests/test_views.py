from django.db.models import Subquery
from django.db.models.aggregates import Count
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
        self.user = UserFactory.create(email="fakeEmail.com")
        self.otherUser = UserFactory.create(email="fakeEmail2.com")
        self.book = BookFactory.create(id="fakeBookId1")
        self.otherBook = BookFactory.create(id="fakeBookId2")
        self.firstReview = ReviewFactory.create(book=self.book, user=self.user)
        self.secondReview = ReviewFactory.create(book=self.book, user=self.otherUser)

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
        )
        serializer = ReviewSerializer(reviews, many=True)
        response = self.client.get(url)

        self.assertEquals(serializer.data, response.data["reviews"])

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
