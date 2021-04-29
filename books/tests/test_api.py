from Liber import settings
import requests
from books.api import getBook, searchBooks
from unittest.mock import patch, Mock
from rest_framework.test import APITestCase


class testGetBook(APITestCase):
    def setUp(self):
        self.googleBook = {
            "id": "fakeId",
            "volumeInfo": {
                "title": "fakeTitle",
                "description": "fakeDescription",
                "authors": ["fakeAuthor1", "fakeAuthor2"],
                "imageLinks": {
                    "thumbnail": "fakeThumbnail",
                },
            },
        }
        self.book = {
            "id": "fakeId",
            "title": "fakeTitle",
            "description": "fakeDescription",
            "authors": "fakeAuthor1, fakeAuthor2",
            "thumbnail": "fakeThumbnail",
        }
        self.error = {"error": "Error retrieving books"}

    def res(self, status, data):
        r = Mock()
        r.status_code = status
        r.json.return_value = data
        return r

    @patch("requests.get", autospec=True)
    def test_results_are_valid(self, mock_get):
        mock_get.return_value = self.res(200, self.googleBook)

        book = getBook("fakeId")

        self.assertEquals(book, self.book)

    @patch("requests.get", autospec=True)
    def test_returns_none_when_not_valid(self, mock_get):

        mock_get.return_value = self.res(404, self.error)

        book = getBook("fakeId")

        self.assertIsNone(book)


class TestSearchBooks(APITestCase):
    def setUp(self):
        self.googleBooks = {
            "totalItems": 2,
            "items": [
                {
                    "id": "fakeId1",
                    "volumeInfo": {
                        "title": "faketitle1",
                        "description": "fakedescription1",
                        "publishedDate": "fakeDate",
                        "authors": ["fakeauthor1", "fakeauthor2"],
                        "imageLinks": {
                            "thumbnail": "fakethumbnail1",
                        },
                    },
                },
                {
                    "id": "fakeId2",
                    "volumeInfo": {
                        "title": "faketitle2",
                        "description": "fakedescription2",
                        "publishedDate": "fakeDate",
                        "authors": ["fakeauthor1", "fakeauthor2"],
                        "imageLinks": {
                            "thumbnail": "fakethumbnail2",
                        },
                    },
                },
            ],
        }
        self.response = [
            {
                "id": "fakeId1",
                "title": "faketitle1",
                "description": "fakedescription1",
                "authors": "fakeauthor1, fakeauthor2",
                "publishedDate": "fakeDate",
                "thumbnail": "fakethumbnail1",
            },
            {
                "id": "fakeId2",
                "title": "faketitle2",
                "description": "fakedescription2",
                "publishedDate": "fakeDate",
                "authors": "fakeauthor1, fakeauthor2",
                "thumbnail": "fakethumbnail2",
            },
        ]

    def res(self, status, data):
        r = Mock()
        r.status_code = status
        r.json.return_value = data
        return r

    @patch("requests.get", autospec=True)
    def test_can_search_books(self, mock_get):
        mock_get.return_value = self.res(200, self.googleBooks)

        books = searchBooks("fakeSearch")
        key = settings.GOOGLE_API_KEY

        mock_get.assert_called_with(
            f"https://www.googleapis.com/books/v1/volumes?key={key}&q=fakeSearch"
        )

        self.assertEquals(books["books"], self.response)

    @patch("requests.get", autospec=True)
    def test_returns_None_when_error_present(self, mock_get):

        mock_get.return_value = self.res(404, {"error": "Error when retrieving"})

        books = searchBooks("fakeSearch")

        self.assertIsNone(books)

    @patch("requests.get", autospec=True)
    def test_returns_None_when_no_items(self, mock_get):
        mock_get.return_value = self.res(200, {"totalItems": 0})

        books = searchBooks("fakeSearch")

        self.assertIsNone(books)