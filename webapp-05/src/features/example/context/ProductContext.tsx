import { createContext, useContext } from "react"

import { type Product } from "@/types"

const ProductCardContext = createContext<{ product: Product } | undefined>(
  undefined,
)

export function useProductCardContext() {
  const context = useContext(ProductCardContext)
  if (!context) {
    throw new Error("ProductCard must be inside a ProductCardProvider")
  }
  return context
}

export default ProductCardContext
