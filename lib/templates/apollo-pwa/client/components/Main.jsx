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

const CREATE_TODO = gql`
  mutation CreateTodo($name: String!) {
    createTodo(name: $name)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

export default function Main() {
  const { data, loading, error } = useQuery(READ_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return <ToDoList createTodo={createTodo} removeTodo={removeTodo} />;
}
