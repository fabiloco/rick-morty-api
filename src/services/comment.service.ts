import { Injectable } from "../lib/container";
import { Comment } from "../models/comment";

@Injectable
export class CommentService {
  async addComment(characterId: number, text: string) {
    return await Comment.create({ characterId, text });
  }
}
