import fetch from "cross-fetch"

import "@testing-library/jest-dom/vitest"

import * as matchers from "@testing-library/jest-dom/matchers"
import { afterAll, afterEach, beforeAll, expect } from "vitest"

import { server } from "./mocks/server"

global.fetch = fetch

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" })
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
})

expect.extend(matchers)
