import type { NextRequest } from "next/server"

import * as bucketsController from "@/features/buckets/buckets.controller"

export async function GET() {
  return bucketsController.listBuckets()
}

export async function POST(request: NextRequest) {
  return bucketsController.createBucket(request)
}
