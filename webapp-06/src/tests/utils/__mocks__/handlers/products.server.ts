import { rest } from "msw"

import { create } from "@/features/example/product.service"
import { PRODUCT_API_URL } from "@/lib/constants"
import { type Product } from "@/types"

export const handlers = [
  rest.post(PRODUCT_API_URL, async (req, res, ctx) => {
    const body = await req.json()
    const { name, sku, price, status } = body as Product

    const data = await create({ name, price, sku, status })
    return res(ctx.status(201), ctx.json(data))
  }),
]
