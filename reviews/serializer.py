from books.models import Book
from authentication.serializer import UserSerializer
from rest_framework.validators import UniqueTogetherValidator
from comments.serializers import CommentSerializer
from .models import Review
from rest_framework import serializers
from books.serializers import BookSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    total_comments = serializers.IntegerField(read_only=True)
    comments = serializers.SerializerMethodField()
    book = BookSerializer(required=False, read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "review",
            "headline",
            "book",
            "rating",
            "created_at",
            "user",
            "total_comments",
            "comments",
        ]

    def get_comments(self, obj):
        qs = obj.comments.all()[:50]
        return CommentSerializer(instance=qs, many=True).data


class ReviewDetailSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    totalComments = serializers.IntegerField(required=False)

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "rating",
            "review",
            "headline",
            "created_at",
            "book",
            "totalComments",
        ]


class BasicReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ["id", "user", "rating", "review", "headline", "created_at"]