import json
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from reviews.models import Review
from typing import OrderedDict
from rest_framework.pagination import PageNumberPagination
from reviews.serializer import ReviewDetailSerializer


class CommentPagination(PageNumberPagination):
    page_size = 100

    def get_paginated_response(self, data):
        obj = OrderedDict(
            [
                ("count", self.page.paginator.count),
                ("next", self.get_next_link()),
                ("previous", self.get_previous_link()),
            ]
        )
        reviewId = self.request.parser_context.get("kwargs", None).get("review", None)
        review = Review.objects.select_related("user", "book").get(pk=reviewId)
        reviewObject = ReviewDetailSerializer(review)
        obj["review"] = reviewObject.data

        obj["comments"] = data
        return Response(obj)
