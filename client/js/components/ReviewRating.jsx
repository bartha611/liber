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
 *
 */

const ReviewRating = ({ rating }) => (
  <div className="ReviewRating">
    <ul
      className="ReviewRating__stars ReviewRating__stars--active"
      style={{ width: `${(rating / 5) * 100}%` }}
    >
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStar} size="lg" color="red" />
      </li>
    </ul>
    <ul className="ReviewRating__stars ReviewRating__stars--inactive">
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color="black" size="lg" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color="black" size="lg" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color="black" size="lg" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color="black" size="lg" />
      </li>
      <li className="ReviewRating__star">
        <FontAwesomeIcon icon={faStarInactive} color="black" size="lg" />
      </li>
    </ul>
  </div>
);

ReviewRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default ReviewRating;
