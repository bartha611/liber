from rest_framework import generics, exceptions
from .permissions import ReviewPermission
from .serializer import ReviewDetailSerializer, ReviewSerializer
from .models import Review
from books.models import Book
from books.api import getBook
from utils.mixins import MultipleFieldsLookupMixin


# Create your views here.
class ReviewView(generics.ListCreateAPIView):
    permission_classes = (ReviewPermission,)
    serializer_class = ReviewSerializer
    queryset = (
        Review.objects.prefetch_related("comments", "comments__user")
        .select_related("user")
        .select_related("book")
    )

    def get_queryset(self):
        book = self.kwargs["book"]
        return (
            Review.objects.filter(book=book)
            .prefetch_related("comments", "comments__user")
            .select_related("user")
            .select_related("book")
        )

    def create(self, request, *args, **kwargs):
        bookId = self.kwargs["book"]
        try:
            # check whether book exists on local database before calling api
            Book.objects.get(id=bookId)
        except Book.DoesNotExist:
            book = getBook(bookId)
            # if no book, raise exception
            if book is None:
                raise exceptions.ValidationError(
                    "Either could not connect to api or volume does not exist in api"
                )
            Book.objects.create(**book)
        return super(ReviewView, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs["book"])
        return serializer.save(user=self.request.user, book=book)


class ReviewDetail(MultipleFieldsLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewDetailSerializer
    permission_classes = (ReviewPermission,)
    lookup_fields = ("pk", "book")
    queryset = Review.objects.all().select_related("user").select_related("book")