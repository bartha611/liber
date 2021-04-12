import React from "react";
import PropTypes from "prop-types";
import { Container, Col } from "reactstrap";
import ReviewRating from "./ReviewRating";
import { useHistory } from "react-router";

/**
 * Component that displays reviews for Front Page
 *
 * @param {Object} props - Props for component
 * @param {Object[]} props.reviews - Review object for component
 * @param {Number} props.reviews[].id - Id of review object
 * @param {String} props.reviews[].review - Review text of book
 * @param {Number} props.reviews[].rating - Rating for review
 * @param {Object} props.reviews[].book - Book Object of review
 * @param {String} props.reviews[].book.thumbnail - Book thumbnail
 * @param {String} props.reviews[].book.title - Title of book
 * @param {String} props.reviews[].book.authors - Authors of book
 */

const BookReviews = ({ reviews }) => {
  const history = useHistory();
  const formatReview = (text) => {
    const ellipsis = text.length > 150 ? "..." : "";
    return `${text.slice(0, 150)}${ellipsis}`;
  };

  return (
    <Container>
      <div className="BookReviews">
        {reviews?.map((review) => (
          <Col xs="12" md="6" className="BookReviews__content" key={review.id}>
            <div
              className="BookReviews__item"
              onClick={() => history.push(`reviews/${review.id}`)}
            >
              <img
                className="BookReviews__thumbnail"
                src={review.book.thumbnail}
                alt="Book thumbnail"
              />
              <div className="BookReviews__info">
                <h3 className="BookReviews__title">{review.book.title}</h3>
                <h6 className="BookReviews__authors">{review.book.authors}</h6>
                <ReviewRating
                  className="BookReviews__rating"
                  rating={review.rating}
                />
                <div className="BookReviews__review">
                  {formatReview(review.review)}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </div>
    </Container>
  );
};

BookReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default BookReviews;
