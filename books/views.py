import json
import requests
import urllib.parse
from django.forms.models import model_to_dict
from django.http import Http404
from django.http import HttpResponse
from django.db.models import Avg, Count
from django.shortcuts import render
from Liber import settings
from reviews.models import Review

# Create your views here.
def searchView(request):
    search = request.GET.get("search")

    if not search:
        raise Http404("Must provide a search pattern")

    site = "https://www.googleapis.com/books/v1/volumes?%s"
    key = settings.GOOGLE_API_KEY
    params = urllib.parse.urlencode({"key": key, "q": search})
    url = site % params

    response = requests.get(url)

    if response.status_code != 200:
        raise Http404("Could not access google book api")

    results = response.json()

    if not hasattr(results, "items"):
        raise Http404("There are no results from api")

    # iterate over items and collect relevant information
    books = []

    for item in results["items"]:
        book = {
            "id": item.get("id", None),
            "title": item.get("volumeInfo", {}).get("title", None),
            "authors": item.get("volumeInfo", {}).get("authors", None),
            "description": item.get("volumeInfo", {}).get("description", None),
            "publishedDate": item.get("volumeInfo", {}).get("publishedDate", None),
            "thumbnail": item.get("volumeInfo", {})
            .get("imageLinks", {})
            .get("thumbnail", None),
        }

        books.append(book)

    return HttpResponse(json.dumps(books), content_type="application/json")


def detailView(request, bookId):
    site = "https://www.googleapis.com/books/v1/volumes/{}?%s".format(bookId)
    key = settings.GOOGLE_API_KEY
    params = urllib.parse.urlencode({"key": key})
    url = site % params

    response = requests.get(url)

    if response.status_code != 200:
        raise Http404("Could not access google book api")

    result = response.json()
    id = result.get("id", None)
    book_aggregates = Review.objects.filter(bookId=id).aggregate(
        average_rating=Avg("rating"), total_reviews=Count("rating")
    )

    book = {
        "id": result.get("id", None),
        "title": result.get("volumeInfo", {}).get("title", None),
        "authors": result.get("volumeInfo", {}).get("authors", None),
        "description": result.get("volumeInfo", {}).get("description", None),
        "publishedDate": result.get("volumeInfo", {}).get("publishedDate", None),
        "thumbnail": result.get("volumeInfo", {})
        .get("imageLinks", {})
        .get("thumbnail", None),
        "average_rating": round(book_aggregates["average_rating"], 3),
        "total_reviews": book_aggregates["total_reviews"],
    }

    return HttpResponse(json.dumps(book), content_type="application/json")
