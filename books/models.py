from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Book(models.Model):
    id = models.CharField(_("id"), max_length=50, primary_key=True)
    thumbnail = models.URLField(_("Thumbnail"), max_length=600, null=True)
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), null=True)
    authors = models.CharField(_("Authors"), max_length=255, null=True)

    def __str__(self):
        return self.title