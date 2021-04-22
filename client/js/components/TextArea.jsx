import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Alert, Button } from "reactstrap";
import { fetchComments } from "../state/ducks/comments";
import { isAuthenticated } from "../utils";

/**
 * Component for Text Area used for reviews and comments
 * @param {Object} props - Props for component
 * @param {String} props.type - Either Comment or Review TextArea
 * @param {String} props.id - Review or book ID
 *
 */

const TextArea = ({ type, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.comments);
  const [text, setText] = useState("");

  const handleClick = () => {
    const result = text.replace(/\n/g, "<br>\n");
    if (!isAuthenticated()) {
      history.push("/login");
    }

    if (type === "comment") {
      dispatch(
        fetchComments(
          `/api/reviews/${id}/comments`,
          "POST",
          { comment: result },
          "CREATE"
        )
      );
      setText("");
    }
  };

  return (
    <div className="textarea">
      <div className="textarea__header">
        <span className="textarea__type">
          {type === "comment" ? "Comment" : "What did you think?"}
        </span>
        <span>Html Allowed</span>
      </div>
      <textarea
        className="textarea__textarea"
        value={text}
        wrap="hard"
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <Button className="textarea__button" onClick={handleClick}>
        Post
      </Button>
      {error && (
        <Alert color="danger" style={{ marginTop: "1rem" }}>
          Error in Sending Comment
        </Alert>
      )}
    </div>
  );
};

export default TextArea;
