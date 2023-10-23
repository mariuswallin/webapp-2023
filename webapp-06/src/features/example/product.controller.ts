import type { Product, QueryParams, Result, WithPagination } from "@/types"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import * as productService from "./product.service"

const requiredKeys = ["sku", "name", "price"]

const isProductData = (data: unknown) => {
  return data &&
    typeof data === "object" &&
    Object.keys(data).some((key) => requiredKeys.includes(key))
    ? (data as Partial<Product>)
    : null
}

// GET
// /api/products
export const listProducts = async (
  params: QueryParams = {},
): Promise<NextResponse<Result<WithPagination<Product[]>>>> => {
  const products = await productService.list(params)
  if (!products.success)
    return NextResponse.json(
      {
        success: false,
        error: products.error,
      },
      { status: 500 },
    )

  return NextResponse.json(products, { status: 200 })
}

// POST
// /api/products
export const createProduct = async (
  req: NextRequest,
): Promise<NextResponse<Result<Product>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()

  // TODO: Validate fields => Happy path
  if (!body || (typeof body === "object" && !Object.keys(body).length))
    return NextResponse.json(
      {
        success: false,
        error: `Missing required fields: ${requiredKeys.join(", ")}`,
      },
      { status: 400 },
    )

  if (
    typeof body === "object" &&
    (requiredKeys.some((key) => !Object.keys(body).includes(key)) ||
      Object.values(body).some((value) => !value))
  ) {
    return NextResponse.json(
      {
        success: false,
        error: `Missing required fields: ${requiredKeys
          .filter((key) => !Object.keys(body).includes(key))
          .join(", ")}`,
      },
      { status: 400 },
    )
  }

  const { name, sku, status, description, price } = body as Product

  const createdProduct = await productService.create({
    price,
    name,
    sku,
    status,
    description,
  })

  // Sjekker hva slags feil servicen gir
  // Dette for å sikre rett statuskode
  if (!createdProduct.success) {
    switch (createdProduct.type) {
      case "Product.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: createdProduct.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: createdProduct.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(createdProduct, { status: 201 })
}

// GET
// /api/products/{id}
// /api/products/...some-id...
export const getProductById = async (
  req: NextRequest,
  id: string,
): Promise<NextResponse<Result<Product>>> => {
  if (!id)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: id",
      },
      { status: 400 },
    )

  const product = await productService.getById({
    id,
  })

  if (!product.success) {
    switch (product.type) {
      case "Product.NotExist":
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(product, { status: 200 })
}

// PUT
// /api/products/{id}
// /api/products/...id...
// BODY: {name: ..., sku: ..., status: ...}
export const updateProductById = async (
  req: NextRequest,
  id: string,
): Promise<NextResponse<Result<Product>>> => {
  const data = await req.json()

  if (!id)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: id",
      },
      { status: 400 },
    )

  const productData = isProductData(data)

  if (!productData) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields",
      },
      { status: 400 },
    )
  }

  const product = await productService.putById(id, productData)

  if (!product.success) {
    switch (product.type) {
      case "Product.NotExist":
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 404 },
        )
      case "Product.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(product, { status: 200 })
}

// PATCH
// /api/products/{id}/publish
export const publishProductById = async (
  req: NextRequest,
  id: string,
): Promise<NextResponse<Result<Product>>> => {
  if (!id)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: id",
      },
      { status: 400 },
    )

  const product = await productService.putById(id, { status: "published" })

  if (!product.success) {
    switch (product.type) {
      case "Product.NotExist":
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: product.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(product, { status: 200 })
}

// DELETE
// /api/products/{id}
// /api/products/...id...
export const removeProductById = async (
  req: NextRequest,
  id: string,
): Promise<NextResponse<Error> | Response> => {
  if (!id)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields: id",
      },
      { status: 400 },
    )

  const removedProduct = await productService.deleteById({
    id,
  })

  if (!removedProduct.success) {
    switch (removedProduct.type) {
      case "Product.NotExist":
        return NextResponse.json(
          {
            success: false,
            error: removedProduct.error,
          },
          { status: 404 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: removedProduct.error,
          },
          { status: 500 },
        )
    }
  }

  return new Response(null, {
    status: 204,
  })
}
