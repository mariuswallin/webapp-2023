import { faker } from "@faker-js/faker"

import { type Cart, type CartItem, type Entity, type Product } from "@/types"

export function generateFakeProducts(count: number): Entity<Product>[] {
  return Array(count)
    .fill(null)
    .map((_) => generateFakeProduct())
}

export function generateFakeProduct(): Entity<Product> {
  return {
    id: faker.string.uuid(),
    sku: faker.commerce.isbn(),
    name: faker.commerce.productName(),
    status: "draft",
    description: faker.lorem.sentence(),
    price: parseFloat(faker.commerce.price()),
  }
}

export function generateFakeCartItems(
  count: number,
): CartItem<Entity<Product>>[] {
  return Array(count)
    .fill(null)
    .map((_) => generateFakeCartItem(generateFakeProduct()))
}

export function generateFakeCartItem(
  product: Entity<Product>,
): CartItem<Entity<Product>> {
  return {
    quantity: Number(faker.number.int({ min: 1, max: 10 })),
    product,
  }
}

export function generateFakeCart(count: number) {
  const carts: Entity<Cart>[] = []

  for (let i = 0; i < count; i++) {
    const items: CartItem<Product>[] = []
    for (let j = 0; j < 2; j++) {
      const product = generateFakeProduct()
      const cartItem = generateFakeCartItem(product)
      items.push(cartItem)
    }

    const cart: Entity<Cart> = {
      id: faker.string.uuid(),
      items: items,
    }

    carts.push(cart)
  }

  return carts
}
