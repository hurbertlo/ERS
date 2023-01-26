import { Client } from "pg";
import { env } from "../util/env";


export const client = new Client({
  database: "ers",
  user: "postgres",
  password: "postgres",
});
client.connect();