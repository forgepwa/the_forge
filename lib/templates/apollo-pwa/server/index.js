const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { typeDefs, resolvers } = require("./graphql.js");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
