import express, { Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

const app = express();

// Setup middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res: Response) => {
  res.send("Dawpark!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
