import factory
import factory.fuzzy
import factory.django
from .models import Review
from authentication.models import User


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


class ReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Review
        django_get_or_create = (
            "user",
            "bookId",
        )

    review = factory.Faker("text")
    user = factory.fuzzy.FuzzyChoice(User.objects.all())
    bookId = factory.fuzzy.FuzzyChoice(books)
    rating = factory.fuzzy.FuzzyInteger(1, 5)