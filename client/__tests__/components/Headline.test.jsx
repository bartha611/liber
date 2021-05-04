import React from "react";
import { mount, shallow } from "enzyme";
import Headline from "../../js/components/Headline";

const mockHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistory,
  }),
}));

describe("Headline component", () => {
  let wrapper;
  let element;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("will mount", () => {
    wrapper = mount(<Headline />);
    expect(wrapper).toBeDefined();
  });
  it("should call history and go to login", () => {
    wrapper = shallow(<Headline />);
    element = wrapper.find(".Headline__button");
    element.at(0).prop("onClick")();
    expect(mockHistory).toHaveBeenCalled();
    expect(mockHistory).toHaveBeenCalledWith("/login");
  });
  it("should call history and go to signup", () => {
    wrapper = shallow(<Headline />);
    element = wrapper.find(".Headline__button");
    element.at(1).prop("onClick")();
    expect(mockHistory).toHaveBeenCalled();
    expect(mockHistory).toHaveBeenCalledWith("/signup");
  });
});
