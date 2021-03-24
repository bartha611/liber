from rest_framework import serializers
from authentication.serializer import UserSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "comment", "user"]
