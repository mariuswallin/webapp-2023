import prisma from "@/lib/prisma"
import {
  type Entity,
  type Product,
  type QueryParams,
  type Result,
  type WithPagination,
} from "@/types"
import { ProductToDomain } from "./mapper"

export const findMany = async (
  params: QueryParams = {},
): Promise<Result<WithPagination<Entity<Product>[]>>> => {
  try {
    const { skip = "0", limit = "10", status = "published" } = params

    if (skip === "3" && status === "draft")
      throw new Error("Invalid skip server")

    const [count, products] = await prisma.$transaction([
      prisma.product.aggregate({
        _count: { status: true },
        where: { status },
      }),
      prisma.product.findMany({
        where: { status },
        skip: Number(skip),
        take: Number(limit),
      }),
    ])
    return {
      success: true,
      data: {
        hasMore:
          count._count.status >
          Number(limit) * (Number(skip) === 0 ? 1 : Number(skip)),
        current: skip,
        data: products.map(ProductToDomain),
      },
    }
  } catch (error) {
    return { success: false, error: "Failed finding products" }
  }
}

export const create = async ({
  name,
  sku,
  status,
  description,
  price,
}: Product): Promise<Result<Product>> => {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price: Number(price),
        description,
        status: status ?? "draft",
      },
    })

    return { success: true, data: ProductToDomain(product) }
  } catch (error) {
    console.error(error)
    return { success: false, error: "Failed creating product" }
  }
}

export const exist = async (
  identifier: { id: string } | { sku: string },
): Promise<Result<Product | null>> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        ...identifier,
      },
    })

    return { success: true, data: product ? ProductToDomain(product) : null }
  } catch (error) {
    return { success: false, error: "Failed finding product" }
  }
}

export const findUnique = async (
  identifier: { id: string } | { sku: string },
): Promise<Result<Product | null>> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        ...identifier,
      },
    })

    return { success: true, data: product ? ProductToDomain(product) : null }
  } catch (error) {
    return { success: false, error: "Failed finding product" }
  }
}

export const updateById = async (
  id: string,
  { name, sku, status, price, description }: Partial<Product>,
): Promise<Result<Product>> => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, sku, price, status, description },
    })

    return { success: true, data: ProductToDomain(product) }
  } catch (error) {
    return { success: false, error: "Failed updating product" }
  }
}

export const removeById = async (id: string): Promise<Result<Product>> => {
  try {
    const product = await prisma.product.delete({ where: { id } })

    return { success: true, data: product }
  } catch (error) {
    return { success: false, error: "Failed deleting product" }
  }
}
