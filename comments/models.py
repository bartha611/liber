from django.db import models
from reviews.models import Review
from authentication.models import User
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Comment(models.Model):
    comment = models.TextField(_("comment"), null=False)
    review = models.ForeignKey(
        Review, related_name="comments", on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(
        _("created at"), auto_now=False, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _("updated at"), auto_now=True, auto_now_add=False
    )

    def __str__(self):
        return "{} {}".format(self.user, self.review)
