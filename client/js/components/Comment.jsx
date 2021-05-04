import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactHTMLParser from "react-html-parser";

/**
 * Component for comment section of reviews
 *
 * @param {Object} props - Props for comment
 * @param {Bool} props.commentHeader Prop to determine whether there is a comment header
 * @param {Object} props.comment - Comments for review
 * @param {Number} props.comment.id - Id of comment
 * @param {String} props.comment.comment - Comment text of review
 * @param {String} props.comment.created_at - Date comment was created at
 * @param {Object} props.comment.user - User who wrote comment
 * @param {Number} props.comment.user.id - Id of user
 * @param {String} props.comment.user.username - Username of user
 */

const Comment = ({ comment, commentHeader, index, currentPage }) => {
  const [loadMore, setLoadMore] = useState(false);
  const formatDate = (date) =>
    new Date(date).toDateString().split(" ").slice(1, 4).join(" ");

  return (
    <div
      className="comment"
      key={comment.id}
      style={commentHeader ? { padding: "1rem 1.5rem" } : { padding: "1rem 0" }}
    >
      {commentHeader && (
        <div className="comment__header">
          <div>
            <b>Message {(currentPage - 1) * 20 + index + 1}</b> By{" "}
            {comment?.user.username}
          </div>
          <div className="comment__date">{formatDate(comment?.created_at)}</div>
        </div>
      )}
      <div className="comment__comment">
        {!commentHeader && (
          <span className="comment__user">{comment?.user.username} </span>
        )}
        {loadMore
          ? ReactHTMLParser(comment?.comment)
          : ReactHTMLParser(comment?.comment.slice(0, 300))}
        {comment?.comment.length > 300 && (
          <div className="loadMore" onClick={() => setLoadMore(!loadMore)}>
            {loadMore ? "Less" : "More"}...
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  commentHeader: PropTypes.bool,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string,
    }),
  }),
};

export default Comment;
