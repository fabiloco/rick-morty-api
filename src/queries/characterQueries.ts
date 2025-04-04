import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLString, ThunkObjMap } from "graphql";
import { CharacterType } from "../schema/types/characterType";
import { Character } from "../models/character";
import { redisClient } from "../lib/redis";
import { Op } from "sequelize";

export const characterQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
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
      const cacheKey = `charactersByFilter:${JSON.stringify(args)}`;
      
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("obteniendo de cache");
        return JSON.parse(cached);
      }

      const whereClause: any = {};
      if (args.name) whereClause.name = { [Op.like]: `%${args.name}%` };
      if (args.status) whereClause.status = args.status;
      if (args.species) whereClause.species = args.species;
      if (args.gender) whereClause.gender = args.gender;
      if (args.origin) whereClause.origin = args.origin;

      const res = await Character.findAll({ where: whereClause });
      const plain = res.map((character) => character.get({ plain: true }));

      await redisClient.set(cacheKey, JSON.stringify(plain), {
        EX: 60 * 60,
      });

        return plain;
      },
    },
}