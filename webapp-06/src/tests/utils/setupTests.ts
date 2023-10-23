import fetch from "cross-fetch"

import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"
import { afterAll, afterEach, beforeAll } from "vitest"

import { server } from "./__mocks__/server"
import resetDb from "./reset-db"

beforeEach(async () => {
  await resetDb()
})

global.fetch = fetch

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
