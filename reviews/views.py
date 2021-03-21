from rest_framework import generics, permissions, exceptions
from .permissions import ReviewPermission
from .serializer import ReviewSerializer
from .models import Review


# Create your views here.
class ReviewView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(user=user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (ReviewPermission,)
    queryset = Review.objects.all()
