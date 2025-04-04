import { GraphQLObjectType } from "graphql";
import { characterQueries } from "../queries/characterQueries";

export const queries = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...characterQueries
  },
});
