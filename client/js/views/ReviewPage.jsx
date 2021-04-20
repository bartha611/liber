import React from "react";
import { Col } from "reactstrap";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils";
import { fetchComments } from "../state/ducks/comments";
import Navigation from "../components/Navigation";
import BookHeader from "../components/BookHeader";
import ReviewHeader from "../components/ReviewHeader";
import ReviewText from "../components/ReviewText";
import Comments from "../components/Comments";
import TextArea from "../components/TextArea";

/**
 * Component for the Review Page
 */

const ReviewPage = () => {
  const { id } = useParams();
  const { review, comments } = useSelector((state) => state.comments);

  useFetch(`/api/reviews/${id}/comments`, "GET", null, "READ", fetchComments);

  return (
    <div className="ReviewPage">
      <Helmet>
        <title>Review {id}</title>
      </Helmet>
      <Navigation />
      <BookHeader book={review?.book} />
      <Col sm="12" lg={{ size: 8, offset: 2 }} className="ReviewText__body">
        <ReviewHeader />
        <ReviewText review={review} />
        <Comments comments={comments} review={id} />
        <TextArea type="comment" id={id} />
      </Col>
    </div>
  );
};

export default ReviewPage;
