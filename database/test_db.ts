import { Client } from "pg";
import { env } from "../util/env";


export const client = new Client({
  database: env.DB_NAME,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
});

client.connect(()=>{
  console.log('connected')

  client.query('select * from users').then((result)=>{
    console.table(result.rows)
    client.end()
  })
});