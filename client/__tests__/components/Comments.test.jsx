import { mount } from "enzyme";
import faker from "faker";
import React from "react";
import Comments from "../../js/components/Comments";

const review = {
  id: 1,
};

const comments = [];

for (let k = 0; k < 50; k++) {
  comments.push({
    id: k,
    comment: faker.lorem.text(),
    user: {
      id: k,
      username: faker.internet.userName(),
    },
  });
}

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("Comments component", () => {
  let wrapper;
  let element;
  it("should mount", () => {
    wrapper = mount(
      <Comments
        comments={comments}
        review={review}
        totalComments={comments.length}
      />
    );
    expect(wrapper).toBeDefined();
  });
  it("calls handleClick fetchReviews no CommentHeader", () => {
    const mockedEvent = { target: {} };
    wrapper = mount(
      <Comments
        comments={comments}
        review={review}
        totalComments={comments.length}
      />
    );
    element = wrapper.find(".page-link");
    element.at(2).prop("onClick")(mockedEvent);
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("calls handleClick fetchComments CommentHeader", () => {
    const mockedEvent = { target: {} };
    wrapper = mount(
      <Comments
        comments={comments}
        review={review}
        totalComments={comments.length}
        commentHeader
      />
    );
    element = wrapper.find(".page-link");
    element.at(2).prop("onClick")(mockedEvent);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
