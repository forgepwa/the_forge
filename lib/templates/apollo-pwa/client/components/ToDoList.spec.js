import React from "react";
import renderer from "react-test-renderer";
import ToDoList from "./ToDoList.jsx";
import ItemList from "../containers/List.jsx";
import { mount } from "enzyme";

describe("ToDoList", () => {
  it("should render componet", () => {
    const component = renderer.create(<ToDoList data={null} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render ItemList", () => {
    const wrapper = mount(
      <ToDoList data={{ todos: [{ name: "study more", completed: false }] }} />
    );
    expect(wrapper.find(ItemList).length).toEqual(1);
  });
  it("should pass data props to ItemList", () => {
    const wrapper = mount(
      <ToDoList data={{ todos: [{ name: "study more", completed: false }] }} />
    );
    expect(wrapper.find(ItemList).prop("data").todos).toHaveLength(1);
  });
});
