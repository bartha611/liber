from django.test import TestCase
from books.models import Book
from books.factories import BookFactory


class TestBookModel(TestCase):
    def test_book_str(self):
        title = "fakeTitle"
        book = BookFactory.create(title=title)

        self.assertEqual(str(book), title)
