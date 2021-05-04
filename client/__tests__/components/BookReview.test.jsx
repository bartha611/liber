import { shallow } from "enzyme";
import React from "react";
import BookReviews from "../../js/components/BookReview";

let userReview = "";
for (let k = 0; k < 151; k++) {
  userReview += "a";
}

const reviews = [
  {
    id: 1,
    rating: 4,
    review: userReview,
  },
  {
    id: 2,
    rating: 3,
    review: null,
  },
];

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("BookReview", () => {
  let wrapper;
  let element;
  let elements;
  beforeEach(() => {
    wrapper = shallow(<BookReviews reviews={reviews} />);
  });
  it("can be rendered", () => {
    expect(wrapper).toBeDefined();
  });
  it("calls history when item is pressed", () => {
    element = wrapper.find(".BookReviews__item").at(0);
    element.prop("onClick")();
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith("/reviews/1");
  });
  it("formatsReview function works properly", () => {
    elements = wrapper.find(".BookReviews__review");
    expect(elements.at(0).text()).toBe(`${userReview.slice(0, 150)}...`);
    expect(elements.at(1).text()).toBe("");
  });
});
