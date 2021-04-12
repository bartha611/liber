from django.db.models import FloatField
from django.db.models.aggregates import Count
from django.db.models.functions import Cast
from django.db.models.expressions import F
from books.serializers import BookSerializer
from typing import OrderedDict
from django.db.models import Avg, Q
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from books.models import Book
from books.api import getBook


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        obj = OrderedDict(
            [
                ("count", self.page.paginator.count),
                ("next", self.get_next_link()),
                ("previous", self.get_previous_link()),
            ]
        )
        bookId = self.request.parser_context.get("kwargs", None).get("book", None)
        if bookId:
            try:
                book = Book.objects.annotate(
                    avgRating=Avg("reviews__rating"),
                    totalReviews=Count("reviews"),
                    fiveStarPercent=Cast(
                        Count("reviews", filter=Q(reviews__rating=5)), FloatField()
                    )
                    / Cast(F("totalReviews"), FloatField())
                    * 100,
                    fourStarPercent=Cast(
                        Count("reviews", filter=Q(reviews__rating=4)), FloatField()
                    )
                    / Cast(F("totalReviews"), FloatField())
                    * 100,
                    threeStarPercent=Cast(
                        Count("reviews", filter=Q(reviews__rating=3)), FloatField()
                    )
                    / Cast(F("totalReviews"), FloatField())
                    * 100,
                    twoStarPercent=Cast(
                        Count("reviews", filter=Q(reviews__rating=2)), FloatField()
                    )
                    / Cast(F("totalReviews"), FloatField())
                    * 100,
                    oneStarPercent=Cast(
                        Count("reviews", filter=Q(reviews__rating=1)), FloatField()
                    )
                    / Cast(F("totalReviews"), FloatField())
                    * 100,
                ).get(id=bookId)

                bookObject = BookSerializer(book)
                obj["book"] = bookObject.data
            except Exception:
                # get book from google api if book doesn't exist in database
                book = getBook(bookId)

                # Book does not exist.  Raise NotFound exception
                if not book:
                    raise NotFound("Book not found")

                obj["book"] = book

        obj["reviews"] = data
        return Response(obj)
