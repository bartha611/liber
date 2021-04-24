import factory
import factory.fuzzy
import factory.django
from books.models import Book


books = [
    "uPqLDQAAQBAJ",
    "mA8A4BYWB1IC",
    "hapdAAAAQBAJ",
    "fdSJDQAAQBAJ",
    "-5TuDwAAQBAJ",
    "Nbpa7hW4hgAC",
    "72aHpwAACAAJ",
    "d25QLwEACAAJ",
    "v7eWDwAAQBAJ",
    "btpIkZ6X6egC",
    "_FjrugAACAAJ",
    "5QRZ4z6A1WwC",
    "JZ5UFcsMaKAC",
    "aWZzLPhY4o0C",
    "yl4dILkcqm4C",
    "AN8TDQAAQBAJ",
    "I8mxughWAOEC",
    "xdHoDwAAQBAJ",
    "TvsF3vxvEswC",
    "GEWXQbASXZUC",
]


class BookFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Book

    id = factory.fuzzy.FuzzyChoice(books)
    title = factory.Faker("word")
    thumbnail = factory.Faker("word")
    description = factory.Faker("text")