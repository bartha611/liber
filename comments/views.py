from django.shortcuts import render
from django.http import Http404
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from reviews.models import Review
from .models import Comment
from .serializers import CommentSerializer
from .permissions import CommentPermission
from utils.mixins import MultipleFieldsLookupMixin


class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().select_related("user")
    permission_classes = (CommentPermission,)
    serializer_class = CommentSerializer

    def get_queryset(self):
        reviewId = self.kwargs["review"]
        return Comment.objects.filter(review=reviewId).select_related("user")

    def perform_create(self, serializer):
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