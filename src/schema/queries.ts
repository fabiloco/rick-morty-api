import { GraphQLObjectType } from "graphql";
import { characterQueries } from "../queries/characterQueries";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...characterQueries
  },
});
