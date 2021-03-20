from django.urls import path
from . import views

urlpatterns = [path("api/reviews", views.ReviewView.as_view())]
