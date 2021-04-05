import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../state/ducks/reviews";
import Navigation from "./Navigation";
import BookReviews from "./BookReview";
import Headline from "./Headline";
import HomeMenu from "./HomeMenu";

const Home = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("recent");
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(`/api/reviews?sort=${sort}`, "GET", null, "READ"));
  }, [sort]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navigation />
      <div style={{ maxHeight: "95vh", overflowY: "scroll" }}>
        <Headline />
        <HomeMenu sort={sort} setSort={setSort} />
        <BookReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default Home;
