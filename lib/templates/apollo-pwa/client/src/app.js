import React from "react";
import ReactDOM from "react-dom";
import Main from "../components/Main.jsx";

import { concat } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const retry = new RetryLink({ attempts: { max: Infinity } });
const http = new createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "",
});
const link = concat(retry, http);

// Use an InMemoryCache, but keep it synced to localStorage
const cache = new InMemoryCache();
const storage = window.localStorage;
const waitOnCache = persistCache({ cache, storage });

const client = new ApolloClient({
  // cache,
  // link: http,
  uri: "http://localhost:4000/graphql",
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
// });

// ReactDOM.render(<Main />, document.getElementById("root"));

waitOnCache.then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>,
    document.getElementById("root")
  );
});
