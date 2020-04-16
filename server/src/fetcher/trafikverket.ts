import axios, { ResponseType, AxiosResponse } from "axios";
import fs from "fs";
import path from "path";

import { Parking } from "../entity/Parking";
import { ParkingShaper } from "../classes/Parking";
import { getConnection } from "typeorm";

/**
 * DOC
 */
export async function getParkings() {
  const postBody = fs.readFileSync(path.resolve(__dirname, "../config/xml/parking.xml")).toString();

  /** Trafikverket requries either:
   * == application/xml
   * == text/xml
   * == text/plain (triggar ingen CORS preflight, mer info finns här (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests).)
   */
  const tConfig = {
    headers: {
      "Content-Type": "text/plain",
    },
  };

  const response: any = await axios
    .post("https://api.trafikinfo.trafikverket.se/v2/data.json", postBody, tConfig)
    .catch((error) => {
      console.log(error);
    });

  // For each parking cluster and parking within it.
  let shapedParkings: Array<ParkingShaper> = [];
  response.data.RESPONSE.RESULT.forEach((parkingCluster) => {
    parkingCluster.Parking.forEach((parking) => {
      let shapedParking = new ParkingShaper(parking);
      shapedParkings.push(shapedParking);
    });
  });

  // Lets bulk insert.
  await getConnection().createQueryBuilder().insert().into(Parking).values(shapedParkings).execute();
}
