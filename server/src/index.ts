import express, { Response } from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

// Reflect metadata for typeorm/postgres
import "reflect-metadata";

// Custom imports
import { getParkings } from "./fetcher/trafikverket";

const app = express();

// Setup middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (_, res: Response) => {
  let status = await getParkings();
  res.send(status);
});

createConnection().then(async (connection) => {
  // If we need to run migrations, it is done before we start the server itself.
  connection.runMigrations();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
