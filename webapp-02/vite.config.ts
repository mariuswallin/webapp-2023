/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    // needed for the tests to work
    alias: {
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/shared/utils", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
    },
    // makes sure that imports etc we needs are added when test starts
    setupFiles: "./tests/setup.ts",
  },
})
