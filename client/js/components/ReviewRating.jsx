import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarInactive } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { fetchReviews } from "../state/ducks/reviews";

/**
 * Component for Review Rating
 *
 * @param {Object} props - Props for component
 * @param {Number} props.rating - Rating of component
 * @param {String} props.outlineColor - Outline color for review rating
 * @param {Boolean} props.interactive Determines whether user can interact with the stars
 *
 */

const ReviewRating = ({
  rating,
  outlineColor = "black",
  reviewId = null,
  bookId = null,
  interactive,
}) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState((rating / 5) * 100);
  const activeStars = [];
  const inactiveStars = [];

  const updateReview = (value) => {
    if (reviewId && interactive) {
      dispatch(
        fetchReviews(
          `/api/reviews/${reviewId}`,
          "PATCH",
          { rating: value },
          "UPDATE"
        )
      );
    } else if (!reviewId && bookId && interactive) {
      dispatch(
        fetchReviews(
          `/api/books/${bookId}`,
          "POST",
          { rating: value },
          "CREATE"
        )
      );
    }
  };

  for (let i = 0; i < 5; i++) {
    activeStars.push(
      <div
        key={i}
        className="ReviewRating__star"
        onClick={() => {
          updateReview(i + 1);
        }}
        onMouseEnter={() =>
          setWidth(interactive ? ((i + 1) / 5) * 100 : (rating / 5) * 100)
        }
        onMouseLeave={() => setWidth((rating / 5) * 100)}
      >
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </div>
    );
    inactiveStars.push(
      <div
        key={5 + i}
        className="ReviewRating__star"
        onClick={() => updateReview(i + 1)}
        onMouseEnter={() =>
          setWidth(interactive ? ((i + 1) / 5) * 100 : (rating / 5) * 100)
        }
        onMouseLeave={() => setWidth((rating / 5) * 100)}
      >
        <FontAwesomeIcon icon={faStarInactive} color={outlineColor} size="lg" />
      </div>
    );
  }

  return (
    <div className="ReviewRating">
      <div
        className="ReviewRating__stars ReviewRating__stars--active"
        style={{ width: `${width}%` }}
      >
        {activeStars}
      </div>
      <div className="ReviewRating__stars ReviewRating__stars--inactive">
        {inactiveStars}
      </div>
    </div>
  );
};

ReviewRating.propTypes = {
  rating: PropTypes.number.isRequired,
  outlineColor: PropTypes.string,
  reviewId: PropTypes.number,
  bookId: PropTypes.string,
  interactive: PropTypes.bool,
};

export default ReviewRating;
