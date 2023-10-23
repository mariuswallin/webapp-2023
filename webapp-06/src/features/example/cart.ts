import { ValidationError } from "@/lib/errors"
import createId from "@/lib/id"
import { type CartItem, type Cart as CartProps, type Product } from "@/types"

export type CreateCart = {
  id: string
  items: () => CartItem<Product>[]
  totalPrice: () => number
  add: (product: Product, quantity: number) => void
  remove: (itemId: string) => void
  empty: () => void
}

export const Cart = (props: CartProps): CreateCart => {
  const id = props.id ?? createId()
  let items: CartItem<Product>[] = props.items ?? []

  function validQuantity(quantity: number): boolean {
    return quantity >= 1 && quantity <= 1000
  }

  function getItems() {
    return items
  }

  function calculateTotalPrice(): number {
    return items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)
  }

  function add(product: Product, quantity: number): void {
    if (!validQuantity(quantity)) {
      throw new ValidationError(
        "SKU needs to have a quantity between 1 and 1000",
      )
    }

    const index = items.findIndex((item) => item.product.sku === product.sku)

    if (index > -1) {
      const product = {
        ...items[index],
        quantity: items[index].quantity + quantity,
      }

      if (!validQuantity(product.quantity)) {
        throw new ValidationError("SKU exceeded allowed quantity")
      }

      items = [...items.slice(0, index), product, ...items.slice(index + 1)]
    } else {
      items = [...items, { product, quantity }]
    }
  }

  function remove(itemId: string): void {
    items = items.filter((item) => item.product.id !== itemId)
  }

  function empty(): void {
    items = []
  }

  return {
    id,
    items: getItems,
    totalPrice: () => calculateTotalPrice(),
    add,
    remove,
    empty,
  }
}
