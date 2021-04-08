import React from "react";
import { Col } from "reactstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils";
import { fetchComments } from "../state/ducks/comments";
import Navigation from "./../components/Navigation";
import BookHeader from "./../components/BookHeader";
import ReviewText from "./../components/ReviewText";
import Comments from "./../components/Comments";

/**
 * Component for the Review Page
 */

const ReviewPage = () => {
  const { id } = useParams();
  const { review, comments, totalComments } = useSelector(
    (state) => state.comments
  );

  useFetch(`/api/reviews/${id}/comments`, "GET", null, "READ", fetchComments);

  return (
    <div className="ReviewPage">
      <Navigation />
      <BookHeader book={review?.book} />

      <Col sm="12" md={{ size: 8, offset: 2 }} className="ReviewText__body">
        <ReviewText review={review} />
        <Comments comments={comments} totalComments={totalComments} />
      </Col>
    </div>
  );
};

export default ReviewPage;
