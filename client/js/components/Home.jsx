import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../state/ducks/reviews";
import Navigation from "./Navigation";
import BookReviews from "./BookReview";

const Home = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews("/api/reviews", "GET", null, "READ"));
  }, []);

  console.log(reviews);

  return (
    <div>
      <Navigation />
      <BookReviews reviews={reviews} />
    </div>
  );
};

export default Home;
