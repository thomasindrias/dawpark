import { Request, NextFunction, Response } from "express";
import { redisClient } from "../redis";

export const cacheForParkings = async (req: Request, res: Response, next: NextFunction) => {
  const redisKeyForParkings = "parkings";

  const redisResult = redisClient.get(redisKeyForParkings, (error?: Error, parkings?: string) => {
    if (error) {
      console.log("Redis:get error: " + error);
      return res.send(error).status(500);
    } else if (parkings) {
      console.log("Cache hit for /parkings");
      return res.send(JSON.parse(parkings)).status(300);
    } else {
      next();
    }
  });
};
