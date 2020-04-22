import express, { Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

// Reflect metadata for typeorm/postgres
import "reflect-metadata";

// Custom imports
import { createPostgresConnection } from "./pgConnection";
import { getParkings } from "./fetcher/trafikverket";

// Routes
import { getAllParkings, getParkingsWithinRange } from "./routes/parkings";

const app = express();

// Setup middlewares
app.use(helmet());

// @TODO: Handle development and production environment differences for cors (Example: Make the origin of request be the frontend in production but not in development)
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.get("/parkings", getAllParkings);
app.get("/parking/proximity", getParkingsWithinRange);
app.get("/", async (_, res: Response) => {
  res.send("Good, better, best. Never let it rest. 'Til your good is better and your better is best.");
});

// We create our DB connection depending on if we are in poroduction (docker/dokku) or local dev machine.
createPostgresConnection().then(async (connection) => {
  // If we need to run migrations, it is done before we start the server itself.
  connection.runMigrations();

  // We fetch fresh trafikverket data, for now using dropSchema on each restart
  // @TODO: Never use dropSchema in production :)))
  //await getParkings();

  // We start our server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
});
