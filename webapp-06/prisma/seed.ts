import { PrismaClient } from "@prisma/client"

import { generateFakeCartItems, generateFakeProducts } from "@/lib/fakes"

const prisma = new PrismaClient()

async function main() {
  await prisma.cart.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.cartItem.deleteMany({})
  const cart = await prisma.cart.create({ data: {} })

  const products = generateFakeProducts(100)

  for (const [index, product] of products.entries()) {
    await prisma.product.create({
      data: {
        ...product,
        status:
          index % 2 === 0
            ? "published"
            : index % 5 === 0
            ? "featured"
            : "draft",
      },
    })
  }

  const cartItems = generateFakeCartItems(3)

  for (const [index, cartItem] of cartItems.entries()) {
    await prisma.cartItem.create({
      data: {
        product: {
          create: {
            ...cartItem.product,
            status: index % 2 === 0 ? "published" : "draft",
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
        quantity: cartItem.quantity,
      },
    })
  }
}

main().catch((err) => {
  console.error("Failed seed", err)
})
