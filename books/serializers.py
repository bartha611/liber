from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    avgRating = serializers.DecimalField(max_digits=3, decimal_places=2, required=False)
    totalReviews = serializers.IntegerField(required=False)

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "description",
            "authors",
            "thumbnail",
            "avgRating",
            "totalReviews",
        ]
