import "dotenv/config";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { graphqlSchema } from "./schema";
import { rootResolver } from "./resolvers/rootResolver";
import { sequelize } from "./lib/database";
import { loggerMiddleware } from "./middlewares/logger.middleware";

import cors from "cors";
import { updateCharactersJob } from "./jobs/updateCharacters.job";
import { redisClient } from "./lib/redis";

const app = express();

// Se inicializa la base de datos
sequelize.authenticate()
  .then(() => {
    console.log("[DATABASE] Database connected successfully.");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Se inicializa el cliente de Redis
redisClient.connect();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware)

// Se inicializa el middleware de GraphQL
app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
  })
);

// cron jobs
updateCharactersJob();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[SERVER] 🚀 Sever running on http://localhost:${PORT}/graphql`);
});
