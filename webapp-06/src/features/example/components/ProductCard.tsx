"use client"

import { useRef } from "react"
import type { ReactNode } from "react"
import { useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { useHover } from "@/hooks/useHover"
import { type Entity, type Product } from "@/types"
import ProductCardContext from "../context/ProductContext"
import { useProduct } from "../hooks/useProduct"

export default function ProductCard({
  product,
  children,
}: {
  product: Entity<Product>
  children: ReactNode
}) {
  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  const router = useRouter()
  const { remove } = useProduct()

  const handleRemove = async () => {
    await remove(product.id)
    router.refresh()
  }

  return (
    <div className="relative" ref={hoverRef}>
      {isHover ? (
        <aside className="absolute right-0 top-0 flex gap-2">
          <button onClick={handleRemove} className="bg-red-500 p-3 text-white">
            <Icons.trash className="h-4 w-4" />
          </button>
        </aside>
      ) : null}
      <ProductCardContext.Provider value={{ product }}>
        {children}
      </ProductCardContext.Provider>
    </div>
  )
}
