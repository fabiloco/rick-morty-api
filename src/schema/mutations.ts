import { GraphQLObjectType } from "graphql";
import { addComment } from "../mutations/addComment";

export const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addComment,
  },
});
