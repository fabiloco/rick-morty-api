import { GraphQLSchema } from "graphql";

import { query } from "./queries";

export const graphqlSchema = new GraphQLSchema({
  query
});
