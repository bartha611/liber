import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import ReactHTMLParser from "react-html-parser";
import ReviewRating from "./ReviewRating";
import Comments from "./Comments";
import { fetchReviews } from "../state/ducks/reviews";

/**
 * Review component
 */

const Review = ({ review }) => {
  const { loading } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const [loadMore, setLoadMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loadComments, setLoadComments] = useState(false);

  const fetchReviewComments = () => {
    dispatch(
      fetchReviews(
        `/api/reviews/${review.id}/comments`,
        "GET",
        null,
        "COMMENTS"
      )
    );
    setLoadComments(!loadComments);
  };

  const formatDate = (date) =>
    new Date(date).toDateString().split(" ").slice(1, 4).join(" ");

  return (
    <div className="review" key={review.id}>
      <div className="review__header">
        <div className="review__info">
          <span className="review__user">{review.user.username}</span>
          <span style={{ marginLeft: "0.5rem" }}>rated it</span>
          <div className="review__rating">
            {!loading && <ReviewRating rating={review.rating} />}
          </div>
        </div>
        <span className="review__date">{formatDate(review.created_at)}</span>
      </div>
      <div className="review__review">
        {ReactHTMLParser(
          loadMore ? review?.review : review?.review?.slice(0, 300)
        )}
        {review?.review?.length > 300 && (
          <span onClick={() => setLoadMore(!loadMore)} className="loadMore">
            ...{loadMore ? "Less" : "More"}
          </span>
        )}
      </div>
      <div className="review__footer">
        <span
          className="review__totalComments"
          onClick={() => setShowComments(!showComments)}
        >
          {review.total_comments} comments
        </span>
        {showComments && (
          <Col xs="12" md="8" className="review__comments">
            <span className="review__link" onClick={fetchReviewComments}>
              View all {review.total_comments} comments
            </span>
            {loadComments && (
              <Comments
                review={review}
                comments={review?.comments}
                totalComments={review?.total_comments}
              />
            )}
          </Col>
        )}
      </div>
    </div>
  );
};

export default Review;
