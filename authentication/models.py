import jwt
import datetime
from django.db import models
from Liber import settings
from .manager import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email"), max_length=255, unique=True)
    username = models.CharField(_("username"), max_length=255, unique=True)
    is_staff = models.BooleanField(_("is staff"), default=False)
    is_superuser = models.BooleanField(_("is superuser"), default=False)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    @property
    def token(self):
        return self._generate_token()

    def _generate_token(self):
        dt = datetime.datetime.now() + datetime.timedelta(days=60)

        token = jwt.encode(
            {"id": self.pk, "exp": dt.strftime("%s")},
            settings.SECRET_KEY,
            algorithm="HS256",
        )

        return token