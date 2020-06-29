import { MUTATION_SUCCESS } from "./types.js";

export function trackedQueriesAdd({
  contextJSON = null,
  id = 0,
  name = "DEFAULT",
  queryJSON = null,
  variablesJSON = { name: "DEFAULT" },
} = {}) {
  return {
    type: MUTATION_SUCCESS,
    payload: {
      queryId: id,
      name,
      queryJSON,
      variablesJSON,
      contextJSON,
    },
  };
}
