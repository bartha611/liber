from authentication.factory import UserFactory
from authentication.models import User
from reviews.factories import ReviewFactory
from comments.factories import CommentFactory
from books.factories import books, BookFactory
from books.api import getBook
from django.core.management.base import BaseCommand, CommandParser


class Command(BaseCommand):
    help = "Seeds the database"

    def add_arguments(self, parser: CommandParser):
        parser.add_argument(
            "--users", default=100, type=int, help="The Number of users you want"
        )

        parser.add_argument(
            "--reviews", default=500, help="The number of reviews you want"
        )

        parser.add_argument(
            "--comments", default=3000, help="The amount of comments you want"
        )

    def handle(self, *args, **options):
        for _ in range(options["users"]):
            UserFactory.create()

        User.objects.create_superuser(
            username="bartha611",
            email="adambarth611@gmail.com",
            password="a",
        )

        # create books for reviews seeding
        for bookId in books:
            book = getBook(bookId)
            BookFactory.create(**book)

        for _ in range(options["reviews"]):
            ReviewFactory.create()

        for _ in range(options["comments"]):
            CommentFactory.create()