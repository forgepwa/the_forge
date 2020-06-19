const { gql } = require("apollo-server-express");

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
    createTodo(name: String!): String
    removeTodo(id: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {
      return todos.push({
        id: Date.now().toString(),
        name: args.name,
        completed: false,
      });
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
