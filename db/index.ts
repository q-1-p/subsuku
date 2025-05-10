import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleSocket } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

export const db = drizzle(process.env.DATABASE_URL as string, { schema });

export const dbSocket = drizzleSocket({
  client: new Pool({ connectionString: process.env.DATABASE_URL }),
  schema,
});
