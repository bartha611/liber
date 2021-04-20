import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { ListGroupItem } from "reactstrap";

/**
 * Component for displaying search results on books
 *
 * @param {Object} props
 * @param {Object} props.book - Book object
 * @param {String} props.book.id - Id of book
 * @param {String} props.book.publishedDate - Date book was published
 * @param {String} props.book.title - Title of book
 * @param {String} props.book.thumbnail - Thumbnail of book
 * @param {String} props.book.authors - Authors of the book separated by a comma
 */

const SearchBook = ({ book }) => (
  <a className="link-inactive" href={`/books/${book.id}`}>
    <ListGroupItem className="searchBook__item">
      {book.thumbnail && (
        <img
          className="searchBook__thumbnail"
          src={book.thumbnail}
          alt="Book thumbnail"
        />
      )}
      {!book.thumbnail && (
        <div className="searchBook__thumbnail searchBook__thumbnail--empty">
          <FontAwesomeIcon icon={faBookOpen} color="white" />
        </div>
      )}
      <div className="searchBook__info">
        <div className="searchBook__title">{book.title}</div>
        <div className="searchBook__authors">By {book.authors}</div>
      </div>
    </ListGroupItem>
  </a>
);

SearchBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    authors: PropTypes.string,
  }).isRequired,
};

export default SearchBook;
