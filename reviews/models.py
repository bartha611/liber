from books.models import Book
from django.db.models import constraints
from authentication.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Review(models.Model):
    review = models.TextField(_("review"), null=True)
    rating = models.IntegerField(
        _("rating"), validators=[MaxValueValidator(5), MinValueValidator(1)]
    )
    headline = models.CharField(_("Headline"), max_length=140, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    book = models.ForeignKey(
        Book, related_name="reviews", on_delete=models.CASCADE, db_index=True
    )
    created_at = models.DateTimeField(
        _("created at"), auto_now=False, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("updated at"), auto_now=True, auto_now_add=False
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "book"], name="user_bookId_unique")
        ]

    def __str__(self):
        return "{} {}".format(self.user, self.book)
