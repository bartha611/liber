from django.urls import path
from . import views

# include urls for authentication
urlpatterns = [
    path("api/user/register", views.RegistrationView.as_view()),
    path("api/user/login", views.LoginView.as_view()),
]
