import requests
from Liber import settings
from .models import Review
from rest_framework import permissions, serializers, exceptions


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["rating", "review", "bookId"]

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
