import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { type Cart, type Product } from "@/types"
import { Cart as CreateCart } from "../cart"

type CartStore = {
  cart: Cart
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  incrementQuantity: (id: Product) => void
  decrementQuantity: (id: Product) => void
  getCartTotal: () => number
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: {},
        addToCart: (product) => {
          set((state) => {
            const cart = CreateCart(state.cart)
            cart.add(product, 1)
            return {
              cart: { ...state.cart, items: cart.items() },
            }
          })
        },
        removeFromCart: (id) => {
          set((state) => {
            const cart = CreateCart(state.cart)
            cart.remove(id)
            return { cart: { ...state.cart, items: cart.items() } }
          })
        },
        incrementQuantity: (product) => {
          set((state) => {
            const cart = CreateCart(state.cart)
            cart.add(product, 1)
            return {
              cart: { ...state.cart, items: cart.items() },
            }
          })
        },
        decrementQuantity: (product) => {
          set((state) => {
            const cart = CreateCart(state.cart)
            cart.add(product, -1)
            return {
              cart: { ...state.cart, items: cart.items() },
            }
          })
        },
        getCartTotal: () => {
          return CreateCart(get().cart).totalPrice()
        },
      }),
      {
        name: "cart-store",
      },
    ),
  ),
)

export default useCartStore
