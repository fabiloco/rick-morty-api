import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLString, ThunkObjMap } from "graphql";
import { CharacterType } from "../schema/types/characterType";
import { Inject } from "../lib/container";
import { CharacterService } from "../services/character.service";

const characterService = Inject(CharacterService);

export const characterQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  characters: {
    type: new GraphQLList(CharacterType),
    resolve: async () => {
      return await characterService.getAllCharacters();
    },
  },
  character: {
    type: CharacterType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: async (_, { id }) => {
      return await characterService.getCharacterById(id);
    },
  },
  charactersByFilter: {
    type: new GraphQLList(CharacterType),
    args: {
      name: { type: GraphQLString },
      status: { type: GraphQLString },
      species: { type: GraphQLString },
      gender: { type: GraphQLString },
      origin: { type: GraphQLString },
    },
    resolve: async (_, args) => {
      return await characterService.getCharactersByFilter(args);
    },
  },
};
