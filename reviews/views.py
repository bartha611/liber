from reviews.pagination import CustomPagination
from django.db.models import Count, Subquery, Avg, Prefetch
from django.db.models.expressions import OuterRef
from authentication.backend import JWTAuth
from rest_framework import generics, exceptions, status
from rest_framework.response import Response
from .permissions import ReviewPermission
from .serializer import ReviewDetailSerializer, ReviewSerializer
from .models import Review
from comments.models import Comment
from books.models import Book
from books.api import getBook


# Create your views here


class BookReviews(generics.ListCreateAPIView):
    permission_classes = (ReviewPermission,)
    pagination_class = CustomPagination

    def get_context_data(self, **kwargs):
        context = super(BookReviews, self).get_context_data(**kwargs)
        context["shit"] = "shit"
        return context

    def get_serializer(self, *args, **kwargs):
        if self.request.method != "GET":
            return ReviewDetailSerializer(*args, **kwargs)
        return ReviewSerializer(*args, **kwargs)

    def get_queryset(self):
        book = self.kwargs.get("book", None)
        if not book:
            raise exceptions.ValidationError("Book id not provided")
        return (
            Review.objects.filter(book=book)
            .select_related("user", "book")
            .annotate(
                total_comments=Subquery(
                    Comment.objects.filter(review=OuterRef("pk"))
                    .values("review")
                    .annotate(count=Count("pk"))
                    .values("count")
                )
            )
            .prefetch_related("comments", "comments__user")
        )

    def get_authenticators(self):
        if self.request.method != "GET":
            return [JWTAuth()]
        return ()

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
        return super(BookReviews, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        book = Book.objects.get(id=self.kwargs["book"])
        serializer.save(user=self.request.user, book=book)


class ReviewView(generics.ListAPIView):
    authentication_classes = ()
    serializer_class = ReviewDetailSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        sort = self.request.query_params.get("sort", None)
        order = "-total_comments" if sort == "comments" else "-id"
        queryset = (
            Review.objects.select_related("user")
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
            .order_by(order)
        )
        return queryset


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewDetailSerializer
    permission_classes = (ReviewPermission,)

    def get_authenticators(self):
        if self.request.method != "GET":
            return [JWTAuth()]
        return ()

    def get_queryset(self):
        if self.request.method == "GET":
            return (
                Review.objects.select_related("user")
                .prefetch_related("comments", "comments__user")
                .prefetch_related(
                    Prefetch(
                        "book",
                        queryset=Book.objects.all().annotate(
                            avgRating=Avg("reviews__rating")
                        ),
                    )
                )
            )
        return Review.objects.all().select_related("user", "book")

    def get_serializer(self, *args, **kwargs):
        if self.request.method == "GET":
            return ReviewSerializer(*args, **kwargs)
        return ReviewDetailSerializer(*args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy()
        return Response({"id": id}, status.HTTP_200_OK)
