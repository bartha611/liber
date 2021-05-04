import { mount } from "enzyme";
import React, { useState } from "react";
import HomeMenu from "../../js/components/HomeMenu";

const App = () => {
  const [sort, setSort] = useState("recent");
  return <HomeMenu sort={sort} setSort={setSort} />;
};

describe("HomeMenu component", () => {
  let wrapper;
  let element;
  it("should mount", () => {
    wrapper = mount(<App />);
    expect(wrapper).toBeDefined();
  });
  test("button", () => {
    wrapper = mount(<App />);

    element = wrapper.find(".HomeMenu__item");
    expect(element.at(0).hasClass("HomeMenu__item--active")).toEqual(true);
    expect(element.at(1).hasClass("HomeMenu__item--active")).toEqual(false);

    element.at(1).prop("onClick")();
    wrapper.update();

    element = wrapper.find(".HomeMenu__item");
    expect(element.at(0).hasClass("HomeMenu__item--active")).toEqual(false);
    expect(element.at(1).hasClass("HomeMenu__item--active")).toEqual(true);

    element.at(0).prop("onClick")();
    wrapper.update();

    element = wrapper.find(".HomeMenu__item");
    expect(element.at(0).hasClass("HomeMenu__item--active")).toEqual(true);
    expect(element.at(1).hasClass("HomeMenu__item--active")).toEqual(false);

    wrapper.update();
  });
});
