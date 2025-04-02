import "dotenv/config";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { graphqlSchema } from "./schema";
import { rootResolver } from "./resolvers/rootResolver";

const app = express();

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
