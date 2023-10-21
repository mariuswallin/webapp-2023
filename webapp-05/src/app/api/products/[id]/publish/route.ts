import type { NextRequest } from "next/server"

import * as productController from "@/features/example/product.controller"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return productController.publishProductById(request, params.id)
}
