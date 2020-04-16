import express, { Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

// Reflect metadata for typeorm/postgres
import "reflect-metadata";

// Custom imports
import { getParkings } from "./fetcher/trafikverket";
import { createPostgresConnection } from "./pgConnection";

const app = express();

// Setup middlewares
app.use(helmet());
// @TODO: Handle development and production environment differences for cors
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (_, res: Response) => {
  //const status = await getParkings();
  res.send("Tjena tomps ;)");
});

// We create our DB connection depending on if we are in poroduction (docker/dokku) or local dev machine.
createPostgresConnection().then((connection) => {
  // If we need to run migrations, it is done before we start the server itself.
  connection.runMigrations();

  // We start our server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
