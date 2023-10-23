"use client"

import { useState } from "react"
import type { Entity, Product } from "@/types"
import type { ChangeEvent } from "react"
import { useQuery } from "@tanstack/react-query"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { type WithPagination } from "@/types"
import { useProduct } from "../hooks/useProduct"
import ProductButton from "./ProductButton"
import ProductCard from "./ProductCard"
import ProductPrice from "./ProductPrice"
import ProductTitle from "./ProductTitle"

export default function Products({
  initialData,
  searchParams,
}: {
  initialData: WithPagination<Entity<Product>[]>
  searchParams: Record<string, string | string[] | undefined>
}) {
  const [page, setPage] = useState(
    Number.isInteger(searchParams.skip) ? Number(searchParams.skip) : 0,
  )
  const clientParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filter = clientParams.get("status") ?? "published"

  const { list } = useProduct()

  const { isError, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["projects", page, filter],
    queryFn: () => list({ skip: page.toString(), status: filter }),
    placeholderData: initialData,
    //initialData: data,
  })

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const current = new URLSearchParams(Array.from(clientParams.entries()))
    current.set("status", event.target.value)
    const query = current.toString()
    router.push(`${pathname}${query ? `?${query}` : ""}`)
    setPage(0)
  }

  if (isError) {
    return (
      <>
        <p>{error.message}</p>
        <section>
          <p>Current Page: {page + 1}</p>
          <button
            onClick={() => {
              setPage((old) => Math.max(old - 1, 0))
            }}
            disabled={page === 0}
          >
            Previous Page
          </button>{" "}
          <button
            onClick={() => {
              setPage((old) => old + 1)
            }}
          >
            Next Page
          </button>
        </section>
      </>
    )
  }

  if (!data || typeof data === "string") {
    return <p>{data}</p>
  }

  if (isFetching && initialData.current !== page.toString()) {
    return <p>Henter data ...</p>
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <select className="mb-3" value={filter} onChange={handleFilter}>
        <option disabled value="">
          Velg
        </option>
        <option value="published">Published</option>
        <option value="featured">Featured</option>
        <option value="draft">Draft</option>
      </select>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product}>
            <article className="border px-4 py-3">
              <ProductTitle />
              <ProductPrice />
              <ProductButton />
            </article>
          </ProductCard>
        ))}
      </section>
      <section className="mt-2">
        <p>Current Page: {page + 1}</p>
        <div className="mt-5 flex gap-2">
          <button
            className="rounded border bg-slate-200 px-2 py-1 text-sm"
            onClick={() => {
              setPage((old) => Math.max(old - 1, 0))
            }}
            disabled={page === 0}
          >
            Previous Page
          </button>
          <button
            className="rounded border bg-slate-200 px-2 py-1 text-sm"
            onClick={() => {
              setPage((old) => (data.hasMore ? old + 1 : old))
            }}
            disabled={isPlaceholderData || !data.hasMore}
          >
            Next Page
          </button>
        </div>
      </section>
    </div>
  )
}
