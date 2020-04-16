import { Request, Response } from "express";
import { Parking } from "../entity/Parking";

export const getAllParkings = async (req: Request, res: Response) => {
  return res.send(await Parking.find());
};
