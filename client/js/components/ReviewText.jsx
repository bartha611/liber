import React from "react";
import ReactHTMLParser from "react-html-parser";
import PropTypes from "prop-types";

/**
 * Component for displaying Review section of Review Page
 *
 * @param {Object} props - Props for component
 * @param {Object} props.review - Review object from component
 *
 */

const ReviewText = ({ review }) => {
  const reviewTitles = [
    "Didn't Like It",
    "It was Ok",
    "Liked It",
    "Really Liked It",
    "Loved It",
  ];

  return (
    <div className="ReviewText">
      <div className="ReviewText__header">
        {reviewTitles[review?.rating - 1]}
      </div>
      <div className="ReviewText__headline">{review?.headline}</div>
      <div className="ReviewText__synopsis">
        <h3 className="ReviewText__synopsis-header">Synopsis</h3>
        {ReactHTMLParser(review?.book?.description)}
      </div>
      <div className="ReviewText__review">
        {ReactHTMLParser(review?.review)}
      </div>
    </div>
  );
};

ReviewText.propTypes = {
  review: PropTypes.shape({
    review: PropTypes.string.isRequired,
  }),
};

export default ReviewText;
