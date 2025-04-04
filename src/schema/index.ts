import { GraphQLSchema } from "graphql";

import { queries } from "./queries";
import { mutations } from "./mutations";

export const graphqlSchema = new GraphQLSchema({
  query: queries,
  mutation: mutations
});
