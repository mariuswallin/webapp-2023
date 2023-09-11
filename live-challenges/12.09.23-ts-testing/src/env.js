import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.string().length(4),
    APP_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION,
  client: {},
  // NOTE: specifying runtimeEnv is not necessary for Next,js >= 13.4.4
  // runtimeEnv: {},
  // you only need to destructure client variables:
  experimental__runtimeEnv: {},
})
