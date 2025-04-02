require('dotenv').config();
module.exports = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rick_and_morty_db',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  migrationsPath: './src/migrations',
};