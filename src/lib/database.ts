import { Sequelize } from "sequelize";
import "dotenv/config";
import { config } from "../config/config";

export const sequelize = new Sequelize(config);
