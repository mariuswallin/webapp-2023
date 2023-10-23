import { createContext, useContext } from "react"

import { type Bucket } from "@/types"

export const BucketContext = createContext<Bucket | undefined>(undefined)

export function useBucketContext() {
  const context = useContext(BucketContext)
  if (!context) {
    throw new Error("Need context provider")
  }
  return context
}
