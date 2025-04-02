import { GraphQLObjectType, GraphQLList } from "graphql";
import { characterResolver } from "../resolvers/characterResolver";
import { CharacterType } from "./types/characterType";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    characters: {
      type: new GraphQLList(CharacterType),
      resolve: characterResolver.characters
    }
  })
});
