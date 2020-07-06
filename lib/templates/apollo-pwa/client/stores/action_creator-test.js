import test from "tape";
import rootReducer from "./reducers";
import { trackedQueriesAdd } from "../actions";
import configureStore from "./configureStore.js";

const pipe = require("lodash/fp/pipe");

const store = configureStore();

test("trackedQuriesAdd()", function (t) {
  const msg = "should add default trackedQueries";
  const actual = pipe(
    () => rootReducer(undefined, trackedQueriesAdd()),
    (state) => {
      return state;
    }
  )();
  const expected = Object.assign(store.getState(), {
    trackedQueries: [],
  });
  t.same(actual, expected, msg);
  t.end();
});
