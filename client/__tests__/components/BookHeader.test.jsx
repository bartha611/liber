import { shallow } from "enzyme";
import React from "react";
import BookHeader from "../../js/components/BookHeader";

const book = {
  id: "fakeId",
  avgRating: 3.45,
  title: "fakeTitle",
  thumbnail: "fakeThumbnail",
  authors: "fakeAuthor",
};

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("BookHeader", () => {
  let wrapper;
  it("should call history when user clicks on title", () => {
    wrapper = shallow(<BookHeader book={book} />);
    wrapper.find(".BookHeader__title").prop("onClick")();
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith("/books/fakeId");
  });
});
