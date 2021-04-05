import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils";

/**
 * Component for the Review Page
 */

const ReviewPage = () => {
  const { id } = useParams();

  useFetch(`/api/reviews/${id}/comments`, "GET", null, "READ");

  return (
    <div className="ReviewPage">
      <h1>Hello there</h1>
    </div>
  );
};

export default ReviewPage;
