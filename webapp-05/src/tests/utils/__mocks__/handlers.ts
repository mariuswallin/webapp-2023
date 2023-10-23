import type { Entity, Product, Result } from "@/types"
import { rest } from "msw"

import "@/types"

import { PRODUCT_API_URL } from "@/lib/constants"
import { products } from "../../fixtures"

export const handlers = [
  rest.get(PRODUCT_API_URL, (req, res, ctx) => {
    const status = req.url.searchParams.get("status")

    return res(
      ctx.json<Result<Entity<Product>[]>>({
        success: true,
        data: status
          ? products.filter((product) => product.status === status)
          : products,
      }),
    )
  }),
  rest.get(`${PRODUCT_API_URL}/:id`, async (req, res, ctx) => {
    const id = req.params.id
    return res(
      ctx.json<Result<Entity<Product>[]>>({
        success: true,
        data: id ? products.filter((product) => product.id === id) : products,
      }),
    )
  }),
  rest.delete(`${PRODUCT_API_URL}/:id`, async (req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.post(PRODUCT_API_URL, async (req, res, ctx) => {
    const body = await req.json()
    const { name, sku, price, status } = body as Product

    return res(ctx.status(201), ctx.json({ name, sku, price, status }))
  }),
]
