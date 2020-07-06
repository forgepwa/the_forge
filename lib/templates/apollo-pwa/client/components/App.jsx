import React from "react";
import { Provider } from "react-redux";
import Main from "./Main.jsx";
import configureStore from "../stores/configureStore.js";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

// if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./components/App', renderApp)
// }
