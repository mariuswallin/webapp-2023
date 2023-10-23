"use client"

import { type Bucket } from "@/types"
import BucketActions from "./BucketActions"
import BucketContent from "./BucketContent"
import BucketItem from "./BucketItem"

export default function BucketList({ buckets }: { buckets: Bucket[] }) {
  return (
    <section className="">
      {buckets.map((bucket) => (
        <BucketItem key={bucket.id} bucket={bucket}>
          <BucketContent />
          <BucketActions />
        </BucketItem>
      ))}
    </section>
  )
}
