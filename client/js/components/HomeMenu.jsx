import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

/**
 * Component for HomePage Navigation Menu
 *
 * @param {Object} props - Props for component
 * @param {String} props.sort - Sort value for component
 * @param {Function} props.setSort - Set sort value for use state
 */

const HomeMenu = ({ sort, setSort }) => (
  <Container className="HomeMenu">
    <h2 className="HomeMenu__title">Discover your next book</h2>
    <ul className="HomeMenu__navigation">
      <button
        type="button"
        className={`HomeMenu__item HomeMenu__item--${
          sort === "recent" ? "active" : "inactive"
        }`}
        onClick={() => setSort("recent")}
      >
        Most Recent
      </button>
      <button
        type="button"
        className={`HomeMenu__item HomeMenu__item--${
          sort === "comments" ? "active" : "inactive"
        }`}
        onClick={() => setSort("comments")}
      >
        Most Commented
      </button>
    </ul>
  </Container>
);

HomeMenu.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default HomeMenu;
