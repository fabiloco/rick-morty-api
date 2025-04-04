import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { Comment } from "../../models/comment";
import { CommentType } from "./commentType";

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
      comments: {
      type: new GraphQLList(CommentType),
      resolve: async (character) => {
        return await Comment.findAll({ where: { characterId: character.id } });
      },
    },
  }),
});
