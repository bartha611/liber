from django.urls import path
from . import views

urlpatterns = [
    path("api/books/<str:book>/reviews", views.ReviewView.as_view()),
    path("api/books/<str:book>/reviews/<int:pk>", views.ReviewDetail.as_view()),
]
