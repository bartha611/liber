import factory
import factory.fuzzy
import factory.faker
from .models import Comment
from reviews.models import Review
from authentication.models import User


class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    comment = factory.Faker("text")
    review = factory.fuzzy.FuzzyChoice(Review.objects.all())
    user = factory.fuzzy.FuzzyChoice(User.objects.all())
