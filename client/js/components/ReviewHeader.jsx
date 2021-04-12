import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import ReviewRating from "./ReviewRating";

/**
 * Header of review
 */

const ReviewHeader = () => {
  const { review, totalComments } = useSelector((state) => state.comments);

  const scrollTo = () => {
    const element = document.getElementById("comments");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul className="ReviewHeader">
      <li className="ReviewHeader__item">
        <span className="ReviewHeader__title">Review</span>
        <div className="ReviewHeader__rating">
          <ReviewRating
            rating={review?.rating}
            outlineColor="darkgrey"
            className="ReviewHeader__rating"
          />
        </div>
      </li>
      <li className="ReviewHeader__item" style={{ marginLeft: "1rem" }}>
        <div className="ReviewHeader__comments" onClick={scrollTo}>
          <FontAwesomeIcon icon={faComment} />
          <span className="ReviewHeader__totalComments">{totalComments}</span>
        </div>
      </li>
    </ul>
  );
};

export default ReviewHeader;
