import { Character } from "../models/character";

export const characterResolver = {
  characters: async () => {
    return await Character.findAll();
  }
};
