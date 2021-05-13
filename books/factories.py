import factory
import factory.fuzzy
import factory.django
from books.models import Book


books = [
    "yl4dILkcqm4C",
    "yhIRBwAAQBAJ",
    "wRxoDgAAQBAJ",
    "tvSoxQEACAAJ",
    "RMd3GpIFxcUC",
    "rIj5x-C7D2cC",
    "QgI5AgAAQBAJ",
    "o2Fzpc7MLrgC",
    "GJqVBgAAQBAJ",
    "f280CwAAQBAJ",
    "EOSLl105rhQC",
    "CgeHW-geducC",
    "BcG2dVRXKukC",
    "5NomkK4EV68C",
    "5iTebBW-w7QC",
    "4z5eL5SGjEoC",
]


class BookFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Book

    id = factory.fuzzy.FuzzyChoice(books)
    title = factory.Faker("word")
    thumbnail = factory.Faker("word")
    description = factory.Faker("text")