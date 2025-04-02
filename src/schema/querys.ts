import { GraphQLObjectType, GraphQLList, GraphQLInt } from "graphql";
import { Character } from "../models/character";
import { CharacterType } from "./types/characterType";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    characters: {
      type: new GraphQLList(CharacterType),
      resolve: async () => {
        return await Character.findAll({ raw: true });
      },
    },
    character: {
      type: CharacterType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (_, { id }) => {
        return await Character.findByPk(id, { raw: true });
      },
    },
  },
});
