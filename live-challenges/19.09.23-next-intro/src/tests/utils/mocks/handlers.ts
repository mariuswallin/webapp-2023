import { rest } from "msw"

export const handlers = [
  rest.get("https://external-api/api/test", (_req, res, ctx) => {
    return res(ctx.json<any>({}))
  }),
  rest.get("/api/local", (_req, res, ctx) => {
    return res(ctx.json<any[]>([{}]))
  }),
]
