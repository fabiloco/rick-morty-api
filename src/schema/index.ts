import { GraphQLSchema } from "graphql";

import { query } from "./querys";

export const graphqlSchema = new GraphQLSchema({
  query
});
