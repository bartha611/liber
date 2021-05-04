import { mount, shallow } from "enzyme";
import faker from "faker";
import React from "react";

import Navigation from "../../js/components/Navigation";
import Headline from "../../js/components/Headline";
import "../../js/utils";

const mockDispatch = jest.fn();
const mockDebounce = jest.fn();
const mockIsAuthenticated = jest.fn();

const books = [];
for (let i = 0; i < 20; i++) {
  books.push({
    id: i,
    title: faker.random.word(),
    thumbnail: faker.internet.avatar(),
  });
}

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({
    books,
  }),
}));

jest.mock("../../js/utils", () => ({
  useDebounce: () => mockDebounce,
  isAuthenticated: () => mockIsAuthenticated,
}));

const App = () => (
  <div>
    <Navigation />
    <Headline />
  </div>
);

describe("Navigation component", () => {
  let wrapper;
  let element;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should mount", () => {
    wrapper = mount(<Navigation />);
    expect(wrapper).toBeDefined();
  });
  it("should display books when user clicks into input field", () => {
    wrapper = mount(<Navigation />);
    element = wrapper.find("input");
    element.at(0).prop("onChange")({ target: { value: "crap" } });
    wrapper.update();

    element = wrapper.find(".searchBook__list");
    console.log(element.at(0).prop("style"));
    expect(element.at(1).prop("style")).toHaveProperty("display", "block");
  });
});
