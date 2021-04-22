import React from "react";
import { Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ReviewRating from "./ReviewRating";

/**
 * Component for Book Header
 *
 * @param {Object} props - Props of book header
 * @param {Object} props.book - Book object
 * @param {Number} props.book.id - Book id
 * @param {String} props.book.title - Title of book
 * @param {String} props.book.authors - Authors of book
 * @param {String} props.book.thumbnail - Url of thumbnail
 * @param {String} props.book.description - Description of book
 * @param {Number} props.book.avgRating - Average rating of book on website
 */

const BookHeader = ({ book }) => {
  const history = useHistory();

  return (
    <div className="BookHeader">
      <div
        className="BookHeader__background"
        style={{ backgroundImage: `url(${book?.thumbnail})` }}
      >
        <div className="BookHeader__wrapper" />
      </div>
      <div className="BookHeader__header">
        <Col
          sm="12"
          md="8"
          lg={{ size: 5, offset: 2 }}
          className="BookHeader__content"
        >
          <img
            className="BookHeader__thumbnail"
            src={book?.thumbnail}
            alt="book thumbnail"
          />
          <div className="BookHeader__info">
            <div
              className="BookHeader__title"
              onClick={() => history.push(`/books/${book.id}`)}
            >
              {book?.title}
            </div>
            <div className="BookHeader__rating">
              <ReviewRating
                rating={book?.avgRating ?? 0}
                outlineColor="lightgray"
              />
            </div>
            <h5 className="BookHeader__authors">By {book?.authors}</h5>
          </div>
        </Col>
      </div>
    </div>
  );
};

BookHeader.propTypes = {
  book: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    avgRating: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookHeader;
