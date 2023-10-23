"use client"

import { useProductCardContext } from "../context/ProductContext"

function ProductPrice() {
  const { product } = useProductCardContext()

  return (
    <div className="text-sm text-slate-600">
      {new Intl.NumberFormat("no-NB", {
        style: "currency",
        currency: "NOK",
      }).format(product.price)}
    </div>
  )
}

export default ProductPrice
