import { GraphQLSchema } from "graphql";

import { mutation } from "./mutation";
import { query } from "./querys";

export const graphqlSchema = new GraphQLSchema({
  mutation,
  query
});
