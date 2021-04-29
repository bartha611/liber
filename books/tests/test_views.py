import json
from reviews.serializer import BasicReviewSerializer
from books.serializers import BookSerializer
from django.http.response import Http404
from books.views import detailView, searchView
from unittest.mock import patch
from rest_framework.test import APIRequestFactory, APITestCase
from books.api import searchBooks
from authentication.factory import UserFactory
from books.factories import BookFactory
from reviews.factories import ReviewFactory


class TestSearchView(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.validRequest = self.factory.get("fakeUrl?search=fakeSearch")
        self.invalidRequest = self.factory.get("fakeUrl")

    @patch("books.views.searchBooks")
    def test_searchview_works(self, mock_search):
        mock_search.return_value = "fakeSearch"
        response = searchView(self.validRequest)

        self.assertEquals(response.status_code, 200)

    def test_searchView_fails_no_search(self):
        request = self.factory.get(self.invalidRequest)

        self.assertRaises(Http404, searchView, request)

    @patch("books.views.searchBooks")
    def test_searchView_raises_http404_no_books(self, mock_get):
        mock_get.return_value = None

        self.assertRaises(Http404, searchView, self.validRequest)


class TestDetailView(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.bookId = "fakeId"
        self.otherBookId = "fakeId2"
        self.user = UserFactory.create()
        self.book = BookFactory.create(id=self.bookId)
        self.otherBook = BookFactory.create(id=self.otherBookId)
        self.review = ReviewFactory.create(user=self.user, book=self.book)
        self.validRequest = self.factory.get(
            "api/books/fakeId", None, HTTP_AUTHORIZATION=f"Bearer {self.user.token}"
        )
        self.invalidRequest = self.factory.get("fakeUrl")

    def test_raise_exception_no_bookId(self):

        self.assertRaises(Http404, detailView, self.validRequest, None)

    @patch("books.views.getBook")
    def test_raise_exception_no_book(self, mock_getBook):
        mock_getBook.return_value = None

        self.assertRaises(Http404, detailView, self.validRequest, "fakeId")

    @patch("books.views.getBook")
    def test_valid_response_with_userReview(self, mock_get):
        mock_get.return_value = BookSerializer(self.book).data
        review = BasicReviewSerializer(self.review).data

        response = detailView(self.validRequest, self.bookId)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            json.loads(response.content)["book"], BookSerializer(self.book).data
        )
        self.assertEqual(json.loads(response.content)["userReview"], review)

    @patch("books.views.getBook")
    def test_valid_response_no_userReview(self, mock_get):
        mock_get.return_value = BookSerializer(self.otherBook).data

        response = detailView(self.validRequest, 200)

        self.assertEqual(response.status_code, 200)

        content = json.loads(response.content)

        self.assertEqual(content["book"], BookSerializer(self.otherBook).data)
        self.assertEqual(content["userReview"], None)
