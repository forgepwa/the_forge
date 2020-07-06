import { MUTATION_SUCCESS } from "../../actions/types.js";

const initialState = { trackedQueries: [] };

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case MUTATION_SUCCESS:
      const { queryId } = action.payload;
      return Object.assign({}, state, {
        trackedQueries: state.trackedQueries.length
          ? state.trackedQueries.filter((query) => query.id !== queryId)
          : [],
      });
    default:
      return state;
  }
}
