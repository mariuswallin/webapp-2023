"use client"

import { useProductCardContext } from "../context/ProductContext"

function ProductTitle() {
  const { product } = useProductCardContext()
  return <h3 className="text-lg font-extrabold">{product.name}</h3>
}

export default ProductTitle
