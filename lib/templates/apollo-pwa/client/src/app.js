import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App.jsx";

import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import QueueLink from "apollo-link-queue";
import SerializingLink from "apollo-link-serialize";
import { trackerLink } from "../links/trackerLink.js";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";

const retry = new RetryLink({ attempts: { max: Infinity } });
const http = new createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Use an InMemoryCache, but keep it synced to localStorage:
const cache = new InMemoryCache();
const storage = window.localStorage;
const waitOnCache = persistCache({ cache, storage });

//Use queueLink to queue requests when the gate(connection) is closed:
const queueLink = new QueueLink();
window.addEventListener("offline", () => queueLink.close());
window.addEventListener("online", () => queueLink.open());

const serializingLink = new SerializingLink();

const link = ApolloLink.from([
  trackerLink,
  queueLink,
  // serializingLink,
  retry,
  http,
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

waitOnCache.then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
