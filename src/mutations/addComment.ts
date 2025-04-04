import { GraphQLInt, GraphQLString } from "graphql";
import { CommentType } from "../schema/types/commentType";
import { Inject } from "../lib/container";
import { CommentService } from "../services/comment.service";

const commentService = Inject(CommentService);

export const addComment = {
  type: CommentType,
  args: {
    characterId: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
  resolve: async (_: any, { characterId, text }: any) => {
    return await commentService.addComment(characterId, text);
  },
};
