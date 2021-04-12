import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";
import BookHeader from "../components/BookHeader";
import Navigation from "../components/Navigation";
import Reviews from "../components/Reviews";
import { fetchReviews } from "../state/ducks/reviews";

/**
 * Book Page
 *
 *
 */

const BookPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { book, reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(`/api/books/${id}/reviews`, "GET", null, "READ"));
  }, [id]);

  return (
    <div className="BookPage">
      <Helmet>
        <title>{book?.title ?? "book"}</title>
      </Helmet>
      <Navigation />
      {book && <BookHeader book={book} />}
      <Row>
        <Col sm="12" md={{ size: 6, offset: 2 }} className="BookPage__body">
          {reviews && <Reviews reviews={reviews} />}
        </Col>
        <Col sm="12" md="2"></Col>
      </Row>
    </div>
  );
};

export default BookPage;
