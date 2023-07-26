import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { EventEmitter } from "events";
console.log(env.PG_CONNECTION_STRING)
console.log(env.PG_CONNECTION_STRING)

const pool = new Pool({
    connectionString: env.PG_CONNECTION_STRING,
})

export const db = drizzle(pool)
export const dbEvent = new EventEmitter()
dbEvent.setMaxListeners(1000000)
