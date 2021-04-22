import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import ReactPaginate from "react-paginate";
import RatingDetail from "../../sass/components/RatingDetail";
import BookHeader from "../components/BookHeader";
import Navigation from "../components/Navigation";
import Review from "../components/Review";
import Synopsis from "../components/Synopsis";
import { fetchReviews } from "../state/ducks/reviews";
import BookActivity from "../components/BookActivity";
import { isAuthenticated } from "../utils";
import ReviewRating from "../components/ReviewRating";

/**
 * Book Page
 *
 *
 */

const BookPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { book, reviews, totalPages, userReview } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    dispatch(
      fetchReviews(`/api/books/${id}/reviews?page=${page}`, "GET", null, "READ")
    );
  }, [id, page]);

  return (
    <div className="BookPage">
      <Helmet>
        <title>{book?.title ?? "book"}</title>
      </Helmet>
      <Navigation />
      {book && <BookHeader book={book} />}
      <Row>
        <Col
          sm="12"
          md="8"
          lg={{ size: 5, offset: 2 }}
          className="BookPage__body"
        >
          {book && userReview && (
            <BookActivity book={book} userReview={userReview} />
          )}
          {book?.description && <Synopsis description={book?.description} />}
          <div className="reviews">
            <h2 className="reviews__title">Reviews</h2>
            {isAuthenticated() && !userReview && (
              <div className="review">
                <span style={{ fontWeight: "bold" }}>{user?.username}</span>{" "}
                start your review of{" "}
                <span style={{ fontWeight: "bold" }}>{book?.title}</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <ReviewRating
                    interactive
                    bookId={book?.id}
                    rating={userReview?.rating ?? 0}
                  />
                  <Button
                    style={{ fontSize: "1.6rem", marginLeft: "2rem" }}
                    onClick={() => history.push(`/review/${book?.id}`)}
                  >
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
            {reviews?.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={(data) => setPage(data.selected + 1)}
            previousLabel="previous"
            nextLabel="next"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </Col>
        <Col sm="12" md="4" lg="3">
          {book && (
            <RatingDetail
              totalReviews={book.totalReviews}
              fiveStarTotal={book.fiveStarTotal}
              fourStarTotal={book.fourStarTotal}
              threeStarTotal={book.threeStarTotal}
              twoStarTotal={book.twoStarTotal}
              oneStarTotal={book.oneStarTotal}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookPage;
