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
  console.log(review);

  return (
    <div className="ReviewText">
      <h2 className="ReviewText__header">Review</h2>
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
