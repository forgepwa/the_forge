import { ApolloLink } from "apollo-link";

export const trackerLink = new ApolloLink((operation, forward) => {
  if (forward === undefined) return null;

  const context = operation.getContext();
  const trackedQueries =
    JSON.parse(window.localStorage.getItem("trackedQueries") || null) || [];

  if (context.tracked !== undefined) {
    const { operationName, query, variables } = operation;

    const newTrackedQuery = {
      query,
      context,
      variables,
      operationName,
    };

    window.localStorage.setItem(
      "trackedQueries",
      JSON.stringify([...trackedQueries, newTrackedQuery])
    );
    
  }

  return forward(operation).map((data) => {
    //Here is where you could create side effect;
    //if the request is tracked but receive the data from source,
    //then we can restore in the original trackedQueries
    if (context.tracked !== undefined) {
      window.localStorage.setItem(
        "trackedQueries",
        JSON.stringify(trackedQueries)
      );
    }

    return data;
  });
});
