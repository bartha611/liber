from authentication.factory import UserFactory
from authentication.models import User
from reviews.factories import ReviewFactory
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

    def handle(self, *args, **options):
        for _ in range(options["users"]):
            UserFactory.create()

        User.objects.create_superuser(
            username="bartha611",
            email="adambarth611@gmail.com",
            password="a",
        )

        for _ in range(options["reviews"]):
            ReviewFactory.create()