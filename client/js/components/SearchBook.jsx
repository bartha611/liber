import React from "react";
import PropTypes from "prop-types";

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
  <div className="searchBook__item">
    <img
      className="searchBook__thumbnail"
      src={book.thumbnail}
      alt="Book thumbnail"
    />
    <div className="searchBook__info">
      <div className="searchBook__title">{book.title}</div>
      <div className="searchBook__authors">By {book.authors}</div>
    </div>
  </div>
);

SearchBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchBook;
