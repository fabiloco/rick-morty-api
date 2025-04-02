import { Dialect } from "sequelize";

interface SequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  migrationsPath: string;
}

export const config: SequelizeConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rick_and_morty_db',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  migrationsPath: './src/migrations',
};
