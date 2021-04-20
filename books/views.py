from reviews.serializer import BasicReviewSerializer
from books.models import Book
import json
from reviews.models import Review
from authentication.backend import JWTAuth
from django.http import Http404
from django.http import HttpResponse
from .api import searchBooks, getBook

# Create your views here.
def searchView(request):
    search = request.GET.get("search")

    if not search:
        raise Http404("Must provide a search pattern")

    books = searchBooks(search)

    if books is None:
        raise Http404("Cannot connect to api or there are not any results")

    # iterate over items and collect relevant information

    return HttpResponse(json.dumps(books), content_type="application/json")


def detailView(request, bookId):
    if not bookId:
        raise Http404("Must provide a volume id")

    obj = {}

    book = getBook(bookId)

    if not book:
        raise Http404("Cannot access api or no volume exists")

    obj["book"] = book

    try:
        user = JWTAuth().authenticate(request=request)
        bookObject = Book.objects.get(id=book["id"])
        userReview = Review.objects.get(user=user[0], book=bookObject)
        obj["userReview"] = BasicReviewSerializer(userReview).data
    except Exception:
        userReview = None
        obj["userReview"] = None
    return HttpResponse(json.dumps(obj), content_type="application/json")
