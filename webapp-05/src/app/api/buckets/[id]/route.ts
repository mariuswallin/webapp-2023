import type { NextRequest } from "next/server"

import * as bucketsController from "@/features/buckets/buckets.controller"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return bucketsController.getBucketById(request, params.id)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return bucketsController.updateBucketById(request, params.id)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  return bucketsController.deleteBucketById(request, params.id)
}
