import React from "react";
import { shallow } from "enzyme";

import Comment from "../../js/components/Comment";

let text = "";

for (let k = 0; k < 301; k++) {
  text += "a";
}

const comment = {
  id: 1,
  comment: text,
  user: {
    id: 1,
    username: "fakeUsername",
  },
  created_at: "2021-04-21 23:49:50.728096",
};

describe("Comment component", () => {
  let wrapper;
  let commentElement;
  let dateElement;
  let element;
  it("should mount", () => {
    wrapper = shallow(<Comment comment={comment} />);
    expect(wrapper).toBeDefined();
  });
  it("loadMore works when user clicks it", () => {
    wrapper = shallow(<Comment comment={comment} />);
    commentElement = wrapper.find(".comment__comment");
    element = wrapper.find(".loadMore");
    expect(commentElement.text()).toBe(
      `${comment.user.username} ${comment.comment.slice(0, 300)}More...`
    );
    element.prop("onClick")();
    wrapper.update();
    commentElement = wrapper.find(".comment__comment");
    expect(commentElement.text()).toBe(
      `${comment.user.username} ${comment.comment}Less...`
    );
  });
  it("should format date properly", () => {
    wrapper = shallow(<Comment comment={comment} commentHeader />);
    dateElement = wrapper.find(".comment__date");
    expect(dateElement.text()).toBe("Apr 21 2021");

    wrapper = shallow(<Comment comment={comment} />);
    dateElement = wrapper.find(".comment__date");
    expect(dateElement.length).toBe(0);
  });
});
