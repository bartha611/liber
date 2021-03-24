from authentication.serializer import UserSerializer
from comments.serializers import CommentSerializer
from .models import Review
from rest_framework import serializers


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    total_comments = serializers.SerializerMethodField()
    comments = CommentSerializer(required=False, many=True)
    bookId = serializers.CharField(max_length=20, read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "review",
            "bookId",
            "user",
            "total_comments",
            "comments",
        ]

    def get_total_comments(self, obj):
        return len(obj.comments.all())


class ReviewDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    bookId = serializers.CharField(max_length=20, read_only=True)

    class Meta:
        model = Review
        fields = ["id", "rating", "review", "bookId", "user"]
