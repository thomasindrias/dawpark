import { Request, Response } from "express";
import { Parking } from "../entity/Parking";
import { getManager, EntityManager } from "typeorm";

export const getAllParkings = async (req: Request, res: Response) => {
  return res.send(await Parking.find()).status(200);
};

export const getParkingsWithinRange = async (req: Request, res: Response) => {
  // In req there should be a body holding a coordinate point and a given range. How many parkings within "xMeters" around "coordinate"

  // The data aquired from the request
  const coordinates = req.body.coordinate; // => POINT(LONG, LAT)
  const range = req.body.range; // => Range in meters

  // We need the entityManager in order to do some specia
  const em: EntityManager = getManager();

  /* @TODO: SQL Injection problem as we don't verify the input properly.
   * POINT (LONG, LAT)
   * WGS SRID = 4326
   */
  const users = await em.query(`SELECT * FROM parking WHERE ST_DWithin(wgs84, ST_GeomFromText('` + coordinates + `', 4326)::geography, '` + range + `')`);

  res.send(users).status(200);
};
