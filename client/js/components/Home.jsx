import React, { useState } from "react";
import Navigation from "./Navigation";

const Home = () => {
  const [isOpen, setIsOpen] = useState();

  const toggle = () => setIsOpen(!isOpen);
  return <Navigation />;
};

export default Home;
