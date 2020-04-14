import axios from "axios";
import fs from "fs";
import path from "path";

/**
 * DOC
 */
export async function getParkings() {
  const postBody = fs
    .readFileSync(path.resolve(__dirname, "../config/xml/parking.xml"))
    .toString();

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
    .post(
      "https://api.trafikinfo.trafikverket.se/v2/data.json",
      postBody,
      tConfig
    )
    .catch((error) => {
      console.log(error);
    });

  // Data contained in RESPONSE.RESULT
  // @TODO: Write each object to the Parking class such that all objects are handled equally.
  console.log(response.data.RESPONSE.RESULT);
}
