import { Sequelize } from "sequelize";
import "dotenv/config";
import { sequlizeConfig } from "../config/sequilizeConfig";

export const sequelize = new Sequelize(sequlizeConfig);
