from rest_framework import generics, response, status
from rest_framework.permissions import AllowAny
from .serializer import RegistrationSerializer, LoginSerializer
from .models import User

# Create your views here.
class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return response.Response(data=serializer.data, status=status.HTTP_200_OK)
