import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();
export default {
    out: "./mig",
    schema: "./src/lib/db/shema/*",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.PG_CONNECTION_STRING!
    }
} satisfies Config
