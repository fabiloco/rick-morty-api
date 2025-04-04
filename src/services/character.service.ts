import { Character } from "../models/character";
import { redisClient } from "../lib/redis";
import { Op } from "sequelize";
import { Injectable } from "../lib/container";

@Injectable
export class CharacterService {
  async getAllCharacters() {
    return await Character.findAll({ raw: true });
  }

  async getCharacterById(id: number) {
    return await Character.findByPk(id, { raw: true });
  }

  async getCharactersByFilter(args: any) {
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

    const characters = await Character.findAll({ where: whereClause });
    const plain = characters.map((c) => c.get({ plain: true }));

    await redisClient.set(cacheKey, JSON.stringify(plain), { EX: 60 * 60 });

    return plain;
  }
}
