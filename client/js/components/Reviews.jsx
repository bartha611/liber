import React from "react";
import ReviewRating from "./ReviewRating";

/**
 * Component for Reviews Section of Book Page
 * @param {Object} props - Props for Reviews component
 * @param {Object[]} props.reviews - Array of review objects
 * @param {String} props.reviews[].id - Id of review
 * @param {String} props.reviews[].review - Review text of review
 * @param {Number} props.reviews[].rating - Rating of review
 * @param {Number} props.reviews[].total_comments - Total Comments of review
 * @param {Object} props.reviews[].user - User who wrote review
 * @param {String} props.reviews[].user.username - Username of user
 */

const Reviews = ({ reviews }) => (
  <div className="reviews">
    {reviews.map((review) => (
      <div className="review">
        <div className="review__header">
          <span className="review__user">{review.user.username}</span>
          <span className="review__header-text">rated it</span>
          <div className="review__rating">
            <ReviewRating rating={review.rating} />
          </div>
        </div>
        <div className="review__review">{review.review}</div>
        <div className="review__footer">
          <span className="review__totalComments">
            {review.total_comments} comments
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default Reviews;
