import type { NextRequest } from "next/server"

import * as productController from "@/features/example/product.controller"

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") ?? undefined
  const limit = request.nextUrl.searchParams.get("limit") ?? undefined
  const skip = request.nextUrl.searchParams.get("skip") ?? undefined

  return productController.listProducts({
    status,
    limit,
    skip,
  })
}

export async function POST(request: NextRequest) {
  return productController.createProduct(request)
}
