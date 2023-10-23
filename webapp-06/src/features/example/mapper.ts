import type { Cart, Entity } from "@/types"
import type { Prisma } from "@prisma/client"
import { type Product as PrismaProduct } from "@prisma/client"

import { type Product } from "@/types"
import { Cart as CreateCart } from "./cart"
import { Product as CreateProduct } from "./product"

const getProducts = (
  items: Prisma.CartItemGetPayload<{
    include: {
      product: true
    }
  }>[],
) => {
  return items.map((item) => {
    const { quantity, product } = item
    const createProduct = CreateProduct(product)
    return {
      quantity,
      product: createProduct,
    }
  })
}

export function ProductToDomain(productModel: PrismaProduct): Entity<Product> {
  return CreateProduct(productModel)
}

export function CartToDomain(
  cartModel: Prisma.CartGetPayload<{
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  }>,
): Cart {
  return {
    id: cartModel.id,
    items: CreateCart({
      items: getProducts(cartModel.items),
    }).items(),
  }
}
