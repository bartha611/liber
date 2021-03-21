import requests
from Liber import settings
from authentication.serializer import UserSerializer
from .models import Review
from rest_framework import permissions, serializers, exceptions


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ["id", "rating", "review", "bookId", "user"]

    def validate_bookId(self, bookId):
        site = "https://www.googleapis.com/books/v1/volumes/{}".format(bookId)
        key = settings.GOOGLE_API_KEY
        url = "{}?key={}".format(site, key)

        response = requests.get(url)

        if response.status_code != 200:
            raise exceptions.ValidationError("Could not connect to api")
        results = response.json()
        if hasattr(results, "error"):
            raise exceptions.ValidationError("Volume does not exist in api")
        return bookId
