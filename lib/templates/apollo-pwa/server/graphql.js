const { gql } = require("apollo-server-express");
const wait = require("waait");

let todos = [];

const typeDefs = gql`
  type Todo {
    id: String
    name: String
    completed: Boolean
  }
  type Query {
    todos: [Todo]!
  }
  type Mutation {
    createTodo(name: String!): Todo
    removeTodo(id: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {
      let newTodo = {
        id: Date.now().toString(),
        name: args.name,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    },
    removeTodo: (parent, args, context, info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(i, 1);
        }
      }
      return args.id;
    },
  },
};

module.exports = { typeDefs, resolvers };
