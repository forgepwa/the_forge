import React from "react";
import ToDoList from "./ToDoList.jsx";
// import './App.css';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const READ_TODOS = gql`
  query todos {
    todos {
      id
      name
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($name: String!) {
    createTodo(name: $name) {
      id
      __typename
      name
      completed
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

export default function Main() {
  const { data, loading, error, refetch } = useQuery(READ_TODOS, {
    notifyOnNetworkStatusChange: true,
  });
  const [createTodo] = useMutation(CREATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <ToDoList
      data={data}
      refetch={refetch}
      createTodo={createTodo}
      removeTodo={removeTodo}
    />
  );
}

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
