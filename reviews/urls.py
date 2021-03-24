from django.urls import path
from . import views

urlpatterns = [
    path("api/books/<str:bookId>/reviews", views.ReviewView.as_view()),
    path("api/books/<str:bookId>/reviews/<int:pk>", views.ReviewDetail.as_view()),
]
