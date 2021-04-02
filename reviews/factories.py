import factory
import factory.fuzzy
import factory.django
from .models import Review
from books.models import Book
from authentication.models import User


class ReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Review
        django_get_or_create = ("user", "book")

    review = factory.Faker("text")
    headline = factory.Faker("word")
    user = factory.fuzzy.FuzzyChoice(User.objects.all())
    book = factory.fuzzy.FuzzyChoice(Book.objects.all())
    rating = factory.fuzzy.FuzzyInteger(1, 5)