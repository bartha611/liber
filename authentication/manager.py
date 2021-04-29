from django.contrib.auth.base_user import BaseUserManager

# Create a manager class for User objects


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        if username is None:
            raise TypeError("Username must be provided")

        if email is None:
            raise TypeError("Email must be provided")

        if password is None:
            raise TypeError("Password must be provided")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_user(self, username, email, password, **extra_fields):
        return self._create_user(
            username=username, email=email, password=password, **extra_fields
        )

    def create_superuser(self, username, password, email, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self._create_user(
            username=username, email=email, password=password, **extra_fields
        )
