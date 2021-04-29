from django.db.models.aggregates import Avg, Count
from reviews.serializer import ReviewDetailSerializer
from books.models import Book
from django.db.models.query import Prefetch
from reviews.models import Review
from comments.views import CommentView
from rest_framework.pagination import DjangoPaginator
from rest_framework.test import APITestCase, APIRequestFactory
from authentication.factory import UserFactory
from books.factories import BookFactory
from reviews.factories import ReviewFactory
from comments.factories import CommentFactory
from comments.pagination import CommentPagination


class TestCommentPagination(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserFactory.create()
        self.totalComments = 26
        self.book = BookFactory.create()
        self.review = ReviewFactory.create(user=self.user, book=self.book)
        self.comments = []
        for k in range(self.totalComments):
            self.comments.append(
                CommentFactory.create(review=self.review, user=self.user)
            )
        self.view = CommentView.as_view()

    def test_paginated_response(self):
        response = self.client.get(f"/api/reviews/{self.review.pk}/comments")
        review = (
            Review.objects.select_related("user")
            .prefetch_related(
                Prefetch(
                    "book",
                    queryset=Book.objects.annotate(avgRating=Avg("reviews__rating")),
                )
            )
            .annotate(totalComments=Count("comments"))
            .get(pk=self.review.pk)
        )
        self.assertEqual(response.data["count"], self.totalComments)
        self.assertIsNotNone(response.data["next"])
        self.assertIsNone(response.data["previous"])
        self.assertEqual(response.data["page"], 1)
        self.assertEqual(response.data["total_pages"], 2)
        self.assertEqual(response.data["review"], ReviewDetailSerializer(review).data)
