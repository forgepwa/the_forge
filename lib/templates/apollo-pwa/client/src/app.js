import React from "react";
import ReactDOM from "react-dom";
import Main from "../components/Main.jsx";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

// ReactDOM.render(<Main />, document.getElementById("root"));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById("root")
);
