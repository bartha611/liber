import React from "react";
import { shallow } from "enzyme";
import BookActivity from "../../js/components/BookActivity";

let review = "";

const reviews = {
  loading: false,
};

for (let i = 0; i < 301; i++) {
  review += "a";
}

const userReview = {
  review,
  rating: 4,
};

const book = {
  id: "fakeId",
};

const mockHistoryPush = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockReturnValue(reviews),
}));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("BookActivity", () => {
  let wrapper;
  let element;
  it("should call history when user clicks edit", () => {
    wrapper = shallow(<BookActivity book={book} userReview={userReview} />);
    wrapper.find(".bookActivity__link").prop("onClick")();
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(`/review/fakeId`);
  });
  it("should display more", () => {
    wrapper = shallow(<BookActivity book={book} userReview={userReview} />);
    element = wrapper.find(".loadMore");
    expect(element.text()).toBe("...More");
    element.prop("onClick")();
    wrapper.update();
    element = wrapper.find(".loadMore");
    expect(element.text()).toBe("...Less");
  });
});
