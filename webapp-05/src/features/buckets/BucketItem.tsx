"use client"

import { type ReactNode } from "react"

import { type Bucket } from "@/types"
import { BucketContext } from "./BucketContext"

export default function BucketItem({
  children,
  bucket,
}: {
  children: ReactNode
  bucket: Bucket
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <BucketContext.Provider value={bucket}>{children}</BucketContext.Provider>
    </div>
  )
}
