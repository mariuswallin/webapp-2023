"use client"

import { useProductCardContext } from "../context/ProductContext"
import useCartStore from "../store/CartStore"

export default function ProductButton() {
  const { product } = useProductCardContext()
  const { addToCart, removeFromCart } = useCartStore()

  const handleAdd = () => {
    addToCart(product)
  }

  const handleRemove = () => {
    removeFromCart(product.id!)
  }

  return (
    <footer>
      <button
        type="button"
        onClick={handleAdd}
        className="mt-3 rounded bg-blue-600 px-3 py-1 text-sm text-white"
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={handleRemove}
        className="mt-3 rounded bg-blue-600 px-3 py-1 text-sm text-white"
      >
        Remove from cart
      </button>
    </footer>
  )
}
