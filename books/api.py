import requests
import urllib.parse
from Liber import settings


def getBook(bookId):
    """
    Pulls id, title, thumbnail, description, and authors from a given volumeId.
    Will return None if a book does not exist
    """

    site = "https://www.googleapis.com/books/v1/volumes/{}".format(bookId)
    key = settings.GOOGLE_API_KEY
    url = "{}?key={}".format(site, key)

    response = requests.get(url)

    # error handling
    if response.status_code != 200:
        return None

    results = response.json()

    if hasattr(results, "error"):
        return None

    book = {
        "id": results.get("id", None),
        "thumbnail": results.get("volumeInfo", {})
        .get("imageLinks", {})
        .get("thumbnail", None),
        "title": results.get("volumeInfo", {}).get("title", None),
        "description": results.get("volumeInfo", {}).get("description", None),
        "authors": ", ".join(results.get("volumeInfo", {}).get("authors", [])),
    }

    return book


def searchBooks(search):
    """
    Pulls books from Google Book Api based on search term.  Will collect id, description, authors, title,
    and thumbnail.  Returns None if api cannot be accessed or no items
    """

    site = "https://www.googleapis.com/books/v1/volumes?%s"
    key = settings.GOOGLE_API_KEY
    params = urllib.parse.urlencode({"key": key, "q": search})
    url = site % params

    response = requests.get(url)

    # error handling
    if response.status_code != 200:
        return None

    results = response.json()

    if not hasattr(results, "items"):
        return None

    # iterate over items and collect relevant information
    books = []

    for item in results["items"]:
        book = {
            "id": item.get("id", None),
            "title": item.get("volumeInfo", {}).get("title", None),
            "authors": ", ".join(item.get("volumeInfo", {}).get("authors", [])),
            "description": item.get("volumeInfo", {}).get("description", None),
            "publishedDate": item.get("volumeInfo", {}).get("publishedDate", None),
            "thumbnail": item.get("volumeInfo", {})
            .get("imageLinks", {})
            .get("thumbnail", None),
        }

        books.append(book)

    return {"books": books}
