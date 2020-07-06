//create your store
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

// import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middleware/logger";
import rootReducer from "./reducers";

export default function configureStore(
  preloadedState = {
    trackedQueries: [],
  }
) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
