from . import views
from django.urls import path

urlpatterns = [
    path("api/reviews/<int:review>/comments", views.CommentView.as_view()),
    path("api/reviews/<int:review>/comments/<int:pk>", views.CommentDetail.as_view()),
]
