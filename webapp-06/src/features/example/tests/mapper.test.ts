import { Cart, CartItem, Product } from "@/types"
import { CartToDomain } from "../mapper"

describe("CartToDomain", () => {
  it("should transform a Prisma Cart model to a Cart domain model", () => {
    const prismaCartModel = {
      id: "cart1",
      items: [
        {
          id: "cartItemId1",
          quantity: 2,
          product: {
            sku: "item1",
            name: "Product 1",
            description: "Description for Product 1",
            price: 10.0,
            id: "product1",
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          cartId: "cart1",
          productId: "product1",
        },
        {
          id: "cartItemId2",
          quantity: 3,
          product: {
            sku: "item2",
            name: "Product 2",
            description: "Description for Product 2",
            price: 5.0,
            id: "product2",
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          cartId: "cart1",
          productId: "product2",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const domainCart: Cart = CartToDomain(prismaCartModel)

    expect(domainCart.id).toBe("cart1")
    expect(domainCart.items).toHaveLength(2)

    const item1: CartItem<Product> = domainCart.items![0]
    expect(item1.quantity).toBe(2)
    expect(item1.product.sku).toBe("item1")
    expect(item1.product.price).toBe(10.0)
    expect(item1.product).toStrictEqual({
      description: "Description for Product 1",
      id: "product1",
      name: "Product 1",
      price: 10,
      sku: "item1",
      status: "draft",
    })

    const item2: CartItem<Product> = domainCart.items![1]
    expect(item2.quantity).toBe(3)
    expect(item2.product.sku).toBe("item2")
    expect(item2.product.price).toBe(5.0)
  })

  it("should handle an empty Prisma Cart model", () => {
    const prismaCartModel = {
      id: "cart1",
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const domainCart: Cart = CartToDomain(prismaCartModel)

    expect(domainCart.id).toBe("cart1")
    expect(domainCart.items).toHaveLength(0)
  })
})
