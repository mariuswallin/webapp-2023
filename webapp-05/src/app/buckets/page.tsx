import { useEffect } from "react"
import Link from "next/link"

import BucketList from "@/features/buckets/BucketList"
import * as bucketService from "@/features/buckets/buckets.service"

export default async function BucketsPage(props?: {
  searchParams: { status: string }
}) {
  const { status = "published" } = props?.searchParams ?? {}
  // const buckets = await prisma.bucket.findMany({})
  const buckets = await bucketService.list({ status })
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch("/api/buckets", { method: "get" })
  //     const result = await response.json()
  //     setData(result)
  //   }

  //   getData()
  // }, [])

  return (
    <main className="mx-auto mt-6 max-w-3xl">
      <Link
        href="/buckets/create"
        className="mb-6 block max-w-fit rounded bg-green-600 px-4 py-1 text-white"
      >
        Lag ny
      </Link>
      <BucketList buckets={buckets.success ? buckets.data : []} />
    </main>
  )
}
