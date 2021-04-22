import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Col } from "reactstrap";
import { fetchReviews } from "../state/ducks/reviews";
import { useFetch } from "../utils";
import Navigation from "./Navigation";
import ReviewRating from "./ReviewRating";

/**
 * Review form for submitting reviews
 */

const ReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rows, setRows] = useState(10);
  const { bookId } = useParams();
  const { loading, userReview, book, error } = useSelector(
    (state) => state.reviews
  );

  useFetch(`/api/books/${bookId}`, "GET", null, "READ", fetchReviews);
  const [review, setReview] = useState(userReview?.review);

  useEffect(() => {
    setReview(userReview?.review);
  }, [loading]);

  const addReview = () => {
    if (userReview) {
      const result = review.replace(/\n/g, "<br/>\n");
      dispatch(
        fetchReviews(
          `/api/reviews/${userReview.id}`,
          "PATCH",
          { review: result },
          "UPDATE",
          history,
          `/books/${bookId}`
        )
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Book Review | Liber</title>
      </Helmet>
      <Navigation />
      {loading && <span>...Loading</span>}
      {error && (
        <Col
          sm="12"
          md={{ size: 10, offset: 1 }}
          lg={{ size: 8, offset: 2 }}
          xl={{ size: 6, offset: 2 }}
        >
          <Alert color="danger">
            Sorry, there was an error retrieving book
          </Alert>
        </Col>
      )}
      {book && (
        <Col
          sm="12"
          md={{ size: 10, offset: 1 }}
          lg={{ size: 8, offset: 2 }}
          xl={{ size: 6, offset: 2 }}
          className="ReviewForm"
        >
          <h2 className="ReviewForm__title">{book?.title ?? "Book"} Review</h2>
          <div className="ReviewForm__header">
            {book?.thumbnail && (
              <img
                src={book?.thumbnail}
                alt="Book thumbnail"
                className="ReviewForm__thumbnail"
              />
            )}
            {!book?.thumbnail && (
              <div className="ReviewForm__thumbnail ReviewForm__thumbnail--empty">
                <FontAwesomeIcon icon={faBookOpen} color="white" />
              </div>
            )}
            <div className="ReviewForm__info">
              <div className="ReviewForm__title ReviewForm__title--small">
                {book?.title ?? "book"}
              </div>
              <span className="ReviewForm__authors">By {book?.authors}</span>
            </div>
          </div>
          <div className="ReviewForm__body">
            <div className="ReviewForm__rating">
              <span>My rating: </span>
              {!loading && (
                <ReviewRating
                  rating={userReview?.rating ?? 0}
                  interactive
                  reviewId={userReview?.id}
                  bookId={book?.id}
                />
              )}
            </div>
            <div className="ReviewForm__review">
              <div className="ReviewForm__review-header">
                <span>What did you think</span>
                <span
                  className="ReviewForm__review-option"
                  onClick={() => setRows(rows + 2)}
                >
                  Enlarge Text Field
                </span>
              </div>
              <textarea
                name="review"
                id="review"
                rows={rows}
                wrap="hard"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Enter your review (optional)"
                className="ReviewForm__review-body"
              />
            </div>
            <button
              className="ReviewForm__submit"
              type="button"
              onClick={addReview}
            >
              Submit
            </button>
          </div>
        </Col>
      )}
    </div>
  );
};

export default ReviewForm;
