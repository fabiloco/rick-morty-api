import { GraphQLInt, GraphQLString } from 'graphql';
import { Comment } from '../models/comment';
import { CommentType } from '../schema/types/commentType';

export const addComment: any  = {
  type: CommentType,
  args: {
    characterId: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
  resolve: async (_, { characterId, text }) => {
    return await Comment.create({ characterId, text });
  },
};
