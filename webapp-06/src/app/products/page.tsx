import Link from "next/link"

import Products from "@/features/example/components/Products"
import { list } from "@/features/example/product.service"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const result = await list(searchParams)

  return (
    <div>
      <Link
        href="/products/create"
        className="mb-6 block max-w-fit rounded bg-green-600 px-4 py-1 text-white"
      >
        Nytt
      </Link>
      {result.success && result.data.data.length > 0 ? (
        <Products initialData={result.data} searchParams={searchParams} />
      ) : (
        <p>Fant ingen produkter</p>
      )}
    </div>
  )
}
