import React from "react";

/**
 * Component that displays rating information for Book Page
 * @param {Object} props - Props for component
 * @param {Number} props.totalReviews - Total reviews for Book
 * @param {Number} props.fiveStarTotal - Total 5 star reviews for Book
 * @param {Number} props.fourStarTotal - Total 4 star reviews for Book
 * @param {Number} props.threeStarTotal - Total 3 star reviews for Book
 * @param {Number} props.twoStarTotal - Total 2 star reviews for Book
 * @param {Number} props.oneStarTotal - Total 1 star reviews for Book
 */

const RatingDetail = ({
  totalReviews,
  fiveStarTotal,
  fourStarTotal,
  threeStarTotal,
  twoStarTotal,
  oneStarTotal,
}) => {
  const formatCount = (count) => {
    if (!count) return 0;
    if (count >= 1000000) {
      return `${Math.floor(count / 1000000)}M`;
    } else if (count >= 1000) {
      return `${Math.floor(count / 1000)}K`;
    } else {
      return count;
    }
  };

  return (
    <div className="ratingDetail">
      <h2 className="ratingDetail__header">Rating Details</h2>
      <div className="ratingDetail__item">
        <span className="ratingDetail__title">
          5 stars ({formatCount(fiveStarTotal)})
        </span>
        <div className="ratingDetail__graph">
          <div
            className="ratingDetail__graph--active"
            style={{
              width: `${(fiveStarTotal / totalReviews) * 100}%`,
              background: "green",
            }}
          />
          <div className="ratingDetail__graph--inactive" />
        </div>
      </div>
      <div className="ratingDetail__item">
        <span className="ratingDetail__title">
          4 stars ({formatCount(fourStarTotal)})
        </span>
        <div className="ratingDetail__graph">
          <div
            className="ratingDetail__graph--active"
            style={{
              width: `${(fourStarTotal / totalReviews) * 100}%`,
              background: "yellowgreen",
            }}
          />
          <div className="ratingDetail__graph--inactive" />
        </div>
      </div>
      <div className="ratingDetail__item">
        <span className="ratingDetail__title">
          3 stars ({formatCount(threeStarTotal)})
        </span>
        <div className="ratingDetail__graph">
          <div
            className="ratingDetail__graph--active"
            style={{
              width: `${(threeStarTotal / totalReviews) * 100}%`,
              background: "yellow",
            }}
          />
          <div className="ratingDetail__graph--inactive" />
        </div>
      </div>
      <div className="ratingDetail__item">
        <span className="ratingDetail__title">
          2 stars ({formatCount(twoStarTotal)})
        </span>
        <div className="ratingDetail__graph">
          <div
            className="ratingDetail__graph--active"
            style={{
              width: `${(twoStarTotal / totalReviews) * 100}%`,
              background: "orange",
            }}
          />
          <div className="ratingDetail__graph--inactive" />
        </div>
      </div>
      <div className="ratingDetail__item">
        <span className="ratingDetail__title">
          1 stars ({formatCount(oneStarTotal)})
        </span>
        <div className="ratingDetail__graph">
          <div
            className="ratingDetail__graph--active"
            style={{
              width: `${(oneStarTotal / totalReviews) * 100}%`,
              background: "red",
            }}
          />
          <div className="ratingDetail__graph--inactive" />
        </div>
      </div>
    </div>
  );
};

export default RatingDetail;
