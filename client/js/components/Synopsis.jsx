import React from "react";
import ReactHTMLParser from "react-html-parser";
import { useState } from "react";

/**
 * Component for Book Descriptions
 *
 * @param {Object} props Props for component
 * @param {String} props.description Book Description pulled from Google API
 */

const Synopsis = ({ description }) => {
  const [loadMore, setLoadMore] = useState(false);

  return (
    <div className="synopsis">
      <h3 className="synopsis__title">Synopsis</h3>
      <div className="synopsis__body">
        {ReactHTMLParser(loadMore ? description : description.slice(0, 300))}
        {description.length > 300 && (
          <span className="loadMore" onClick={() => setLoadMore(!loadMore)}>
            ...{loadMore ? "Less" : "More"}
          </span>
        )}
      </div>
    </div>
  );
};

export default Synopsis;
