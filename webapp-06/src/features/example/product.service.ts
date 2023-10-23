import { sendEmail } from "@/lib/email"
import {
  type Entity,
  type Product,
  type QueryParams,
  type Result,
  type WithPagination,
} from "@/types"
import * as productsRepo from "./product.repository"

export const list = async (
  params: QueryParams = {},
): Promise<Result<WithPagination<Entity<Product>[]>>> => {
  const products = await productsRepo.findMany(params)

  if (!products.success) return { success: false, error: products.error }
  return { success: true, data: products.data }
}

export const create = async ({
  name,
  sku,
  status,
  description,
  price,
}: Product): Promise<Result<Product>> => {
  const product = await productsRepo.exist({ sku: sku })

  if (!product.success) return { success: false, error: product.error }

  if (product.data) {
    return {
      success: false,
      type: "Product.Duplicate",
      error: `Item with ${sku} already exist`,
    }
  }

  const createdProduct = await productsRepo.create({
    sku,
    name,
    status,
    description,
    price,
  })

  if (!createdProduct.success) {
    return { success: false, error: createdProduct.error }
  }

  sendEmail("from@test.no", "to@test.no", "body")

  return { success: true, data: createdProduct.data }
}

export const getById = async ({
  id,
}: {
  id: string
}): Promise<Result<Product>> => {
  const product = await productsRepo.findUnique({ id })

  if (!product.success) return { success: false, error: product.error }
  if (!product.data)
    return {
      success: false,
      type: "Product.NotExist",
      error: `Product with ${id} does not exist`,
    }

  return { success: true, data: product.data }
}

export const putById = async (
  id: string,
  data: Partial<Product>,
): Promise<Result<Product>> => {
  const product = await productsRepo.exist({ id })

  if (!product.success) {
    return { success: false, error: product.error }
  }

  if (!product.data) {
    return {
      success: false,
      type: "Product.NotExist",
      error: `Product with ${id} does not exist`,
    }
  }

  // brukes til å sjekke vi prøver å endre sku`en til et produkt
  // må da sjekke om den nye sku`en finnes fra før
  if (data.sku) {
    const productWithUpdatedSku = await productsRepo.exist({ sku: data.sku })

    if (productWithUpdatedSku.success && productWithUpdatedSku.data) {
      return {
        success: false,
        type: "Product.Duplicate",
        error: `Item with ${data.sku} already exist`,
      }
    }
  }

  const updatedProduct = await productsRepo.updateById(id, data)

  if (!updatedProduct.success) {
    return { success: false, error: updatedProduct.error }
  }

  return { success: true, data: updatedProduct.data }
}

export const deleteById = async ({
  id,
}: {
  id: string
}): Promise<Result<Product>> => {
  const product = await productsRepo.exist({ id })

  if (!product.success) {
    return { success: false, error: product.error }
  }

  if (!product.data) {
    return {
      success: false,
      type: "Product.NotExist",
      error: `Product with ${id} does not exist`,
    }
  }

  const removedProduct = await productsRepo.removeById(id)

  if (!removedProduct.success)
    return { success: false, error: removedProduct.error }

  return { success: true, data: removedProduct.data }
}
