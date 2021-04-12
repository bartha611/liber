import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import ReactHTMLParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../state/ducks/comments";

/**
 * Component for comment section of reviews
 *
 * @param {Object} props - Props for comment
 * @param {Number} props.review - Review id
 * @param {Object[]} props.comments - Comments for review
 * @param {Number} props.comments[].id - Id of comment
 * @param {String} props.comments[].comment - Comment text of review
 * @param {String} props.comments[].created_at - Date comment was created at
 * @param {Object} props.comments[].user - User who wrote comment
 * @param {Number} props.comments[].user.id - Id of user
 * @param {String} props.comments[].user.username - Username of user
 *
 */

const Comments = ({ comments, review }) => {
  const dispatch = useDispatch();
  const formatDate = (date) =>
    new Date(date).toDateString().split(" ").slice(1, 4).join(" ");
  const { totalPages, currentPage } = useSelector((state) => state.comments);

  const handleClick = (data) => {
    const page = data.selected + 1;
    dispatch(
      fetchComments(
        `/api/reviews/${review}/comments?page=${page}`,
        "GET",
        null,
        "READ"
      )
    );
  };

  return (
    <div id="comments" className="comments">
      <h2 className="comments__header">Comments</h2>
      {comments?.map((comment, index) => (
        <div className="comment" key={comment.id}>
          <div className="comment__header">
            <div>
              <b>Message {(currentPage - 1) * 20 + index + 1}</b> By{" "}
              {comment?.user.username}
            </div>
            <div className="comment__date">
              {formatDate(comment?.created_at)}
            </div>
          </div>
          <div className="comment__comment">
            {ReactHTMLParser(comment?.comment)}
          </div>
        </div>
      ))}
      <div className="comments__pagination">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handleClick}
          previousLabel={"previous"}
          nextLabel={"next"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

Comments.propTypes = {
  totalComments: PropTypes.string.isRequired,
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
