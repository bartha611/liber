import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import ReactHTMLParser from "react-html-parser";
import ReviewRating from "./ReviewRating";

/**
 * Book Activity component for BookPage
 * @param {Object} props Props for BookPage
 * @param {Object} props.book Book object for BookPage
 * @param {String} props.book.id Id of book
 * @param {String} props.book.title Title of book
 * @param {Object} props.userReview UserReview object or null
 * @param {Number} props.userReview.id UserReview id
 * @param {Number} props.userReview.rating Rating for book
 * @param {String} props.userReview.review Review for book
 */

const BookActivity = ({ book, userReview }) => {
  const history = useHistory();
  const [loadMore, setLoadMore] = useState(false);
  const { loading } = useSelector((state) => state.reviews);

  return (
    <div className="bookActivity">
      <div className="bookActivity__header">
        <h1 className="bookActivity__title">My Activity</h1>
        <div
          className="bookActivity__link"
          onClick={() => history.push(`/review/${book?.id}`)}
        >
          Edit
        </div>
      </div>
      <Row className="bookActivity__section">
        <Col xs="4" className="bookActivity__headline">
          <span className="bookActivity__info">Review of</span>
        </Col>
        <Col xs="8" className="bookActivity__results">
          <span className="bookActivity__body">{book?.id}</span>
        </Col>
      </Row>
      <Row className="bookActivity__section">
        <Col xs="4" className="bookActivity__headline">
          <span className="bookActivity__info">Rating</span>
        </Col>
        <Col xs="8" className="bookActivity__results">
          <span className="bookActivity__body">
            {!loading && (
              <ReviewRating
                rating={userReview?.rating ?? 0}
                interactive
                reviewId={userReview?.id}
                bookId={book?.id}
              />
            )}
          </span>
        </Col>
      </Row>
      <Row className="bookActivity__section">
        <Col xs="4" className="bookActivity__headline">
          <span className="bookActivity__info">Review</span>
        </Col>
        <Col xs="8" className="bookActivity__results">
          <div className="bookActivity__body">
            {loadMore
              ? ReactHTMLParser(userReview?.review)
              : ReactHTMLParser(userReview?.review.slice(0, 300))}
            {userReview?.review.length > 300 && (
              <span className="loadMore" onClick={() => setLoadMore(!loadMore)}>
                ...{loadMore ? "Less" : "More"}
              </span>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookActivity;
