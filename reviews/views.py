from rest_framework import generics, permissions, exceptions
from .serializer import ReviewSerializer
from .models import Review


# Create your views here.
class ReviewView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)