import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLInt },
    characterId: { type: GraphQLInt },
    text: { type: GraphQLString },
  },
});
