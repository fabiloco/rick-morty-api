import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    gender: { type: GraphQLString },
    origin: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});
