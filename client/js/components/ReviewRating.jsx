import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarInactive } from "@fortawesome/free-regular-svg-icons";

/**
 * Component for Review Rating
 *
 * @param {Object} props - Props for component
 * @param {Number} props.rating - Rating of component
 * @param {String} props.outlineColor - Outline color for review rating
 *
 */

const ReviewRating = ({ rating, outlineColor = "black" }) => {
  const activeStars = [];
  const inactiveStars = [];

  for (let i = 0; i < 5; i++) {
    activeStars.push(
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
    );
    inactiveStars.push(
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color={outlineColor} size="lg" />
      </li>
    );
  }

  return (
    <div className="ReviewRating">
      <ul
        className="ReviewRating__stars ReviewRating__stars--active"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        {activeStars}
      </ul>
      <ul className="ReviewRating__stars ReviewRating__stars--inactive">
        {inactiveStars}
      </ul>
    </div>
  );
};

ReviewRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default ReviewRating;
