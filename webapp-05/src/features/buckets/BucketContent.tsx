"use client"

import { useBucketContext } from "./BucketContext"

export default function BucketContent() {
  const { id, title, status } = useBucketContext()
  return (
    <div className="flex w-full justify-between">
      <span>{id}</span>
      <span>{title}</span>
      <span>{status}</span>
    </div>
  )
}
