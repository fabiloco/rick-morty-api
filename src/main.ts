import "dotenv/config";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { graphqlSchema } from "./schema";
import { rootResolver } from "./resolvers/rootResolver";
import { sequelize } from "./models/database";

const app = express();

sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos:", error);
  });

app.all(
  "/graphql",
  createHandler({
    schema: graphqlSchema,
    rootValue: rootResolver,
    // graphiql: true
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/graphql`);
});
