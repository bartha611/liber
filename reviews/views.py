from django.db.models.query import Prefetch
from reviews.pagination import CustomPagination
from django.db.models import Q, Count, Subquery, Avg
from django.db.models.expressions import OuterRef
from authentication.backend import JWTAuth
from rest_framework import generics, exceptions, status, permissions
from rest_framework.response import Response
from .permissions import ReviewPermission
from .serializer import ReviewDetailSerializer, ReviewSerializer
from comments.models import Comment
from .models import Review
from books.models import Book
from books.api import getBook


# Create your views here


class ReviewView(generics.ListCreateAPIView):
    permission_classes = (ReviewPermission,)
    serializer_class = ReviewSerializer
    pagination_class = CustomPagination

    def get_authenticators(self):
        if self.request.method != "GET":
            return [JWTAuth()]
        return ()

    def get_serializer(self, *args, **kwargs):
        if self.request.method == "GET":
            return ReviewSerializer(*args, **kwargs)
        else:
            return ReviewDetailSerializer(*args, **kwargs)

    def get_queryset(self):
        book = self.kwargs.get("book", None)
        query = Q()
        if book is not None:
            query &= Q(book=book)
        sort = self.request.query_params.get("sort", None)
        order = "-total_comments" if sort == "comments" else "-id"
        queryset = (
            Review.objects.select_related("user")
            .filter(query)
            .prefetch_related(
                Prefetch(
                    "book",
                    queryset=Book.objects.all().annotate(
                        avgRating=Avg("reviews__rating"), totalReviews=Count("reviews")
                    ),
                )
            )
            .annotate(
                total_comments=Subquery(
                    Comment.objects.filter(review=OuterRef("pk"))
                    .values("review")
                    .annotate(count=Count("pk"))
                    .values("count")
                ),
            )
            .prefetch_related("comments", "comments__user")
            .order_by(order)
        )
        return queryset

    def create(self, request, *args, **kwargs):
        bookId = self.kwargs.get("book", None)
        try:
            bookObj = Book.objects.get(id=bookId)
        except Book.DoesNotExist:
            book = getBook(bookId)
            if book is None:
                raise exceptions.ValidationError(
                    "Could not connect to api or book does not exist"
                )

            bookObj = Book.objects.create(**book)
        try:
            Review.objects.get(user=self.request.user, book=bookObj)
            raise exceptions.ValidationError("Review already exists for book and user")
        except Review.DoesNotExist:
            pass
        return super(ReviewView, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs["book"])
        serializer.save(user=self.request.user, book=book)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (JWTAuth,)
    serializer_class = ReviewDetailSerializer
    permission_classes = (ReviewPermission,)
    queryset = Review.objects.all().select_related("user").select_related("book")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy()
        return Response({"id": id}, status.HTTP_200_OK)
