import React from "react";
import { Button, Container } from "reactstrap";

const Headline = () => (
  <div className="Headline">
    <div className="Headline__wrapper">
      <div className="Headline__headline">
        <Container>
          <h2 className="Headline__title">Discover your next shitty book</h2>
          <div className="Headline__button-group">
            <Button size="lg" className="Headline__button">
              Login
            </Button>
            <Button size="lg" className="Headline__button">
              Sign-up
            </Button>
          </div>
        </Container>
      </div>
    </div>
  </div>
);

export default Headline;
