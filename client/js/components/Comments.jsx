import React from "react";
import PropTypes from "prop-types";

/**
 * Component for comment section of reviews
 *
 * @param {Object} props - Props for comment
 * @param {String} props.total_comments - Total comments for review
 * @param {Object[]} props.comments - Comments for review
 * @param {Number} props.comments[].id - Id of comment
 * @param {String} props.comments[].comment - Comment text of review
 * @param {String} props.comments[].created_at - Date comment was created at
 * @param {Object} props.comments[].user - User who wrote comment
 * @param {Number} props.comments[].user.id - Id of user
 * @param {String} props.comments[].user.username - Username of user
 *
 */

const Comments = ({ comments, totalComments }) => {
  const formatDate = (date) => new Date(date).toDateString();

  return (
    <div className="comments">
      <h2 className="comments__header">{totalComments} Comments</h2>
      {comments?.map((comment, index) => (
        <div className="comment">
          <div className="comment__header">
            <div>
              <b>Message {index + 1}</b> By {comment?.user.username}
            </div>
            <div className="comment__date">
              {formatDate(comment?.created_at)}
            </div>
          </div>
          <div className="comment__comment">{comment?.comment}</div>
        </div>
      ))}
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
