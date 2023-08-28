import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
import {
  mergeConfig as _mergeConfig,
  defaultExclude,
  defineConfig,
} from "vitest/config"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mergeConfig = (
  base: Record<string, any>,
  config: Record<string, any>,
) => _mergeConfig(base, config)
/* eslint-enable @typescript-eslint/no-explicit-any */

export const baseConfig = defineConfig({
  plugins: [tsConfigPaths({ projects: [`./testing.json`] })],
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["html", "text", "json"],
    },
  },
})

export const reactConfig = mergeConfig(baseConfig, {
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
})

export default mergeConfig(reactConfig, {
  resolve: {
    // needed for the tests to work
    alias: {
      "@/src": fileURLToPath(new URL("./src", import.meta.url)),
      "@/components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@/lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
    },
  },
  test: {
    setupFiles: "src/tests/utils/setupTests.ts",
    exclude: [...defaultExclude, "**/e2e/**/*"],
    include: ["src/**/*.(spec|test).{js,jsx,ts,tsx}"],
  },
})
