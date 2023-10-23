import Link from "next/link"

import BucketList from "@/features/buckets/BucketList"
import prisma from "@/lib/prisma"

export default async function BucketsPage() {
  const buckets = await prisma.bucket.findMany({})
  return (
    <main className="mx-auto max-w-3xl">
      <Link
        href="/buckets/create"
        className="mb-6 block max-w-fit rounded bg-green-600 px-4 py-1 text-white"
      >
        Lag ny
      </Link>
      <BucketList buckets={buckets} />
    </main>
  )
}
