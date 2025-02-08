import { config } from 'dotenv';
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
config({ path: '.env.local' });
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.string().default('3001'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default("development"),
    BASE_PATH: z.string().default('/api'),
    APP_ORIGIN: z.string().default('http://localhost:3000'),
    BETTER_AUTH_SECRET: z.string(),
    ADMIN_PASSWORD: z.string().default("admin123"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});