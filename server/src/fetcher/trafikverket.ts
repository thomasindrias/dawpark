import { post } from "request";
import fs from "fs";
import path from "path";

// import parkingXML from "../config/xml/parking.xml";

/**
 *
 */
export function getParkings() {
  const postBody = fs
    .readFileSync(path.resolve(__dirname, "../config/xml/parking.xml"))
    .toString();

  const request = post(
    {
      url: "https://api.trafikinfo.trafikverket.se/v2/data.json",
      body: postBody,
      headers: {
        "Content-Type": "text/xml",
      },
    },
    (error, response, body) => {
      console.log(response);
    }
  );
}
