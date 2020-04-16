import { getConnectionOptions, createConnection } from "typeorm";
import { Parking } from "./entity/Parking";

export const createPostgresConnection = async () => {
  const conOptions = await getConnectionOptions(process.env.NODE_ENV);

  // @TODO: Change as any to proper typing
  return process.env.NODE_ENV === "production"
    ? createConnection({ ...conOptions, url: process.env.DATABASE_URL, entities: [Parking], name: "default" } as any)
    : createConnection({ ...conOptions, name: "default" });
};
