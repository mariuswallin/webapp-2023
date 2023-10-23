import type { NextRequest } from "next/server"

import * as bucketsController from "@/features/buckets/buckets.controller"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return bucketsController.createBucketItem(request, params.id)
}
