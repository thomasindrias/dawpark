import { Request, Response } from "express";
import { Parking } from "../entity/Parking";
import { getManager, EntityManager } from "typeorm";
import * as yup from "yup";
import * as wkx from "wkx";
import { Geometry } from "geojson";
import { formatError } from "../utils/formatError";

import { redisClient } from "../redis";

export const getAllParkings = async (req: Request, res: Response) => {
  // If we make it here we know there was no hit in the cache. We need to set a new RedisEntry
  const redisKeyForParkings = "parkings";

  const dbResult = await Parking.find();
  redisClient.set(redisKeyForParkings, JSON.stringify(dbResult));

  return res.send(await Parking.find()).status(200);
};

export const getParkingsWithinRange = async (req: Request, res: Response) => {
  // In req there should be a body holding a coordinate point and a given range. How many parkings within "xMeters" around "coordinate"

  // The data aquired from the request
  const coordinates = req.query.coordinate; // => POINT(LONG, LAT)
  const range = req.query.range; // => Range in meters

  try {
    await getParkingsWithinRangeSchema.validate({ coordinate: coordinates, range }, { abortEarly: false });
  } catch (err) {
    console.log("Coordinates (WKT): " + coordinates);
    console.log("Range (meters): " + range);
    console.log("==============================");
    return res.send(formatError(err)).status(400);
  }

  // We need the entityManager in order to do some specia
  const em: EntityManager = getManager();

  let queryString = `SELECT * FROM parking WHERE ST_DWithin(wgs84, ST_GeomFromText('` + coordinates + `', 4326)::geography, '` + range + `')`;
  console.log("Query ===> " + queryString);
  console.log("=================================");

  /* @TODO: SQL Injection problem as we don't verify the input properly.
   * POINT (LONG, LAT)
   * WGS SRID = 4326
   */
  const users = await em.query(`SELECT * FROM parking WHERE ST_DWithin(wgs84, ST_GeomFromText('` + coordinates + `', 4326)::geography, '` + range + `')`);

  /*
   * @TODO: This is a naive solution to the problem. A proper SQL-query could do the same parsing without having to go through all the data again
   * However, the number of parkings returned is generally a small n so the runtime impact is not major.
   *
   * Time complexity O(n) where n is the number of returned parkings
   */
  users.forEach((parking) => {
    parking.wgs84 = wkx.Geometry.parse(Buffer.from(parking.wgs84, "hex")).toGeoJSON();
  });

  res.send(users).status(200);
};

const getParkingsWithinRangeSchema: yup.ObjectSchema = yup.object().shape({
  coordinate: yup.string().required(),
  range: yup.number().positive().required(),
});
