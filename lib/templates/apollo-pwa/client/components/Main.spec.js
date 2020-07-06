import React from "react";
import renderer from "react-test-renderer";
import Main, { READ_TODOS, CREATE_TODO, REMOVE_TODO } from "./Main.jsx";
import ToDoList from "./ToDoList.jsx";
import { MockedProvider } from "@apollo/react-testing";

const wait = require("waait");
const mocks = [
  {
    request: {
      query: READ_TODOS,
    },
    result: {
      data: {
        todos: [{ id: 1, name: "Study More", completed: false }],
      },
    },
  },
  {
    request: {
      query: CREATE_TODO,
      variables: {
        name: "Enjoy Studying",
      },
    },
    result: {
      data: {
        todos: [
          { id: 1, name: "Study More", completed: false },
          { id: 2, name: "Enjoy Studying", completed: false },
        ],
      },
    },
  },
  {
    request: {
      query: REMOVE_TODO,
      variables: {
        name: "Enjoy Studying",
      },
    },
    result: {
      data: {
        id: 2,
      },
    },
  },
];

describe("Main", () => {
  it("should have loading state initially", () => {
    const component = renderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <Main />
      </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree.children).toContain("loading...");
  });
  it("should render the final todo item", async () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>
    );

    await wait(0);
    const item = component.root.findByType(ToDoList);
    expect(item.props.data.todos).toHaveLength(1);
  });
});
