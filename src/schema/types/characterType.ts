import { GraphQLObjectType, GraphQLString } from "graphql";

export const CharacterType = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    gender: { type: GraphQLString },
    origin: { type: GraphQLString },
    image: { type: GraphQLString }
  })
});
