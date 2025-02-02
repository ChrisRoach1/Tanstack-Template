import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";

import db from "@/db/client";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql", // or "mysql", "sqlite"
        schema: schema
    }),
    emailAndPassword: {  
      enabled: true
  },
});
