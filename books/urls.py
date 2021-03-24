from django.urls import path
from . import views

urlpatterns = [
    path("api/books", views.searchView),
    path("api/books/<str:bookId>", views.detailView),
]
