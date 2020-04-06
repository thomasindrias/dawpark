import express, { Response } from "express";

const app = express();

app.get("/", (_, res: Response) => {
  res.send("Dawpark!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
