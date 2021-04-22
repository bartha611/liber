import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { fetchComments } from "../state/ducks/comments";
import Comment from "./Comment";
import { fetchReviews } from "../state/ducks/reviews";

/**
 * Component for comment section of reviews
 *
 * @param {Object} props - Props for comment
 * @param {Number} props.review - Review id
 * @param {Number} props.currentPage Current page
 * @param {Object[]} props.comments - Comments for review
 * @param {Number} props.comments[].id - Id of comment
 * @param {String} props.comments[].comment - Comment text of review
 * @param {String} props.comments[].created_at - Date comment was created at
 * @param {Object} props.comments[].user - User who wrote comment
 * @param {Number} props.comments[].user.id - Id of user
 * @param {String} props.comments[].user.username - Username of user
 *
 */

const Comments = ({
  comments,
  review,
  commentHeader,
  totalComments,
  currentPage,
}) => {
  const dispatch = useDispatch();

  const handleClick = (data) => {
    const page = data.selected + 1;

    if (commentHeader) {
      dispatch(
        fetchComments(
          `/api/reviews/${review?.id}/comments?page=${page}`,
          "GET",
          null,
          "READ"
        )
      );
    } else {
      dispatch(
        fetchReviews(
          `/api/reviews/${review?.id}/comments?page=${page}`,
          "GET",
          null,
          "COMMENTS"
        )
      );
    }
  };

  return (
    <div id="comments" className="comments">
      {commentHeader && <h2 className="comments__header">Comments</h2>}
      {comments?.map((comment, index) => (
        <Comment
          comment={comment}
          index={index}
          currentPage={currentPage}
          commentHeader={commentHeader}
        />
      ))}
      <div className="comments__pagination">
        <ReactPaginate
          pageCount={Math.ceil(totalComments / 20)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handleClick}
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
      </div>
    </div>
  );
};

Comments.propTypes = {
  totalComments: PropTypes.string.isRequired,
  commentHeader: PropTypes.bool,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default Comments;
