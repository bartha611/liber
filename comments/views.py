from django.contrib.auth.models import AnonymousUser
from rest_framework.exceptions import ValidationError
from comments.pagination import CommentPagination
from authentication.backend import JWTAuth
from django.http import Http404
from rest_framework import generics
from reviews.models import Review
from .models import Comment
from .serializers import CommentSerializer
from .permissions import CommentPermission
from utils.mixins import MultipleFieldsLookupMixin


class CommentView(generics.ListCreateAPIView):
    permission_classes = (CommentPermission,)
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    def get_authenticators(self):
        if self.request.method != "GET":
            return [JWTAuth()]
        return ()

    def get_queryset(self):
        reviewId = self.kwargs.get("review", None)
        try:
            Review.objects.get(pk=reviewId)
        except Review.DoesNotExist:
            raise Http404()
        return (
            Comment.objects.filter(review=reviewId)
            .select_related("user")
            .order_by("id")
        )

    def perform_create(self, serializer):
        if self.request.user == AnonymousUser():
            raise ValidationError("User not authenticated")
        try:
            review = Review.objects.get(pk=self.kwargs["review"])
            serializer.save(user=self.request.user, review=review)
        except Review.DoesNotExist:
            raise Http404()


class CommentDetail(MultipleFieldsLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all().select_related("user")
    serializer_class = CommentSerializer
    lookup_fields = ("pk", "review")
    permission_classes = (CommentPermission,)