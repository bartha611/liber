import requests
from Liber import settings
from rest_framework import generics, exceptions
from rest_framework.generics import get_object_or_404
from .permissions import ReviewPermission
from .serializer import ReviewDetailSerializer, ReviewSerializer
from .models import Review


# Create your views here.
class ReviewView(generics.ListCreateAPIView):
    permission_classes = (ReviewPermission,)
    serializer_class = ReviewSerializer
    queryset = Review.objects.prefetch_related("comments").select_related("user")

    def get_queryset(self):
        book = self.kwargs["bookId"]
        return (
            Review.objects.filter(bookId=book)
            .prefetch_related("comments", "comments__user")
            .select_related("user")
        )

    def create(self, request, *args, **kwargs):
        bookId = self.kwargs["bookId"]
        site = "https://www.googleapis.com/books/v1/volumes/{}".format(bookId)
        key = settings.GOOGLE_API_KEY
        url = "{}?key={}".format(site, key)

        response = requests.get(url)

        if response.status_code != 200:
            raise exceptions.ValidationError("Could not connect to api")
        results = response.json()
        if hasattr(results, "error"):
            raise exceptions.ValidationError("Volume does not exist in api")
        return super(ReviewView, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user, bookId=self.kwargs["bookId"])


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewDetailSerializer
    permission_classes = (ReviewPermission,)
    lookup_fields = ("pk", "bookId")
    queryset = Review.objects.all().select_related("user")

    def get_object(self):
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        filters = {}
        for field in self.lookup_fields:
            filters[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filters)
        self.check_object_permissions(self.request, obj)
        return obj
