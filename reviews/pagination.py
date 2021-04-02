from typing import OrderedDict
from django.db.models import Avg
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from books.models import Book


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
        try:
            book = Book.objects.annotate(avgRating=Avg("reviews__rating")).get(
                id=bookId
            )
            obj["book"] = {
                "id": book.id,
                "title": book.title,
                "thumbnail": book.thumbnail,
                "avgRating": round(book.avgRating, 2),
                "authors": book.authors,
                "description": book.description,
            }
        except Exception:
            pass
        obj["reviews"] = data
        return Response(obj)
