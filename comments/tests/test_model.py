from comments.models import Comment
from authentication.factory import UserFactory
from reviews.factories import ReviewFactory
from comments.factories import CommentFactory
from books.factories import BookFactory
from django.test import TestCase


class TestCommentModel(TestCase):
    def test_comment_str(self):
        user = UserFactory.create()
        book = BookFactory.create()
        review = ReviewFactory.create(user=user, book=book)
        comment = CommentFactory.create(user=user, review=review)

        self.assertEqual(str(comment), f"{user} {review}")