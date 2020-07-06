import React from "react";
import renderer from "react-test-renderer";
import ItemList from "./List.jsx";
import { mount } from "enzyme";

describe("ItemList", () => {
  it("remove todo should be called with the right item", () => {
    const removeTodo = jest.fn();
    const wrapper = mount(
      <ItemList
        data={{ todos: [{ id: 1, name: "study more", completed: false }] }}
        removeTodo={removeTodo}
      />
    );
    const ItemCloseComponent = wrapper.find("button");
    ItemCloseComponent.simulate("click");
    expect(removeTodo).toHaveBeenCalledWith({ variables: { id: 1 } });
  });
});
