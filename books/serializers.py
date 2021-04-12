from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    avgRating = serializers.DecimalField(max_digits=4, decimal_places=2, required=False)
    totalReviews = serializers.IntegerField(required=False)
    fiveStarPercent = serializers.DecimalField(
        max_digits=4, decimal_places=2, required=False
    )
    fourStarPercent = serializers.DecimalField(
        max_digits=4, decimal_places=2, required=False
    )

    threeStarPercent = serializers.DecimalField(
        max_digits=4, decimal_places=2, required=False
    )

    twoStarPercent = serializers.DecimalField(
        max_digits=4, decimal_places=2, required=False
    )

    oneStarPercent = serializers.DecimalField(
        max_digits=4, decimal_places=2, required=False
    )

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
            "fiveStarPercent",
            "fourStarPercent",
            "threeStarPercent",
            "twoStarPercent",
            "oneStarPercent",
        ]
