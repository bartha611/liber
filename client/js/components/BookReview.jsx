import React from "react";
import PropTypes from "prop-types";
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
  console.log(reviews);
  return (
    <div className="BookReviews">
      {reviews &&
        reviews.map((review) => (
          <div className="BookReviews__item">
            <img
              className="BookReviews__thumbnail"
              src={review.book.thumbnail}
              alt="Book thumbnail"
            />
            <h3 className="BookReviews__title">{review.book.title}</h3>
          </div>
        ))}
    </div>
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
