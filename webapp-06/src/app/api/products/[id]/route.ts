import type { NextRequest } from "next/server"

import * as productController from "@/features/example/product.controller"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return productController.getProductById(request, params.id)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return productController.updateProductById(request, params.id)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return productController.removeProductById(request, params.id)
}
