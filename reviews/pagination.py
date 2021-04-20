from reviews.serializer import BasicReviewSerializer, ReviewDetailSerializer
from requests.api import request
from authentication.backend import JWTAuth
from django.db.models.aggregates import Count
from books.serializers import BookSerializer
from typing import OrderedDict
from django.db.models import Avg, Q
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from books.models import Book
from reviews.models import Review
from books.api import getBook


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        obj = OrderedDict(
            [
                ("count", self.page.paginator.count),
                ("next", self.get_next_link()),
                ("previous", self.get_previous_link()),
                ("total_pages", self.page.paginator.num_pages),
            ]
        )
        bookId = self.request.parser_context.get("kwargs", None).get("book", None)
        if bookId:
            try:
                book = Book.objects.annotate(
                    avgRating=Avg("reviews__rating"),
                    totalReviews=Count("reviews"),
                    fiveStarTotal=Count("reviews", filter=Q(reviews__rating=5)),
                    fourStarTotal=Count("reviews", filter=Q(reviews__rating=4)),
                    threeStarTotal=Count("reviews", filter=Q(reviews__rating=3)),
                    twoStarTotal=Count("reviews", filter=Q(reviews__rating=2)),
                    oneStarTotal=Count("reviews", filter=Q(reviews__rating=1)),
                ).get(id=bookId)

                bookObject = BookSerializer(book)
                obj["book"] = bookObject.data

                try:
                    user = JWTAuth().authenticate(self.request)
                    if user:
                        userReview = Review.objects.select_related("user").get(
                            book=bookId, user=user[0]
                        )
                        ReviewObject = BasicReviewSerializer(userReview)
                        obj["userReview"] = ReviewObject.data
                    else:
                        obj["userReview"] = None
                except Exception:
                    userReview = None
                    obj["userReview"] = None

            except Book.DoesNotExist:
                # get book from google api if book doesn't exist in database
                book = getBook(bookId)

                # Book does not exist.  Raise NotFound exception
                if not book:
                    raise NotFound("Book not found")

                obj["book"] = book

        obj["reviews"] = data
        return Response(obj)
