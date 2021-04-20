from rest_framework import serializers
from reviews.models import Review
from .models import Book


class UserReview(serializers.ModelSerializer):
    class Meta:
        model = "Review"
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    avgRating = serializers.DecimalField(max_digits=4, decimal_places=2, required=False)
    totalReviews = serializers.IntegerField(required=False)
    fiveStarTotal = serializers.IntegerField(required=False)
    fourStarTotal = serializers.IntegerField(required=False)
    threeStarTotal = serializers.IntegerField(required=False)
    twoStarTotal = serializers.IntegerField(required=False)
    oneStarTotal = serializers.IntegerField(required=False)

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
            "fiveStarTotal",
            "fourStarTotal",
            "threeStarTotal",
            "twoStarTotal",
            "oneStarTotal",
        ]
