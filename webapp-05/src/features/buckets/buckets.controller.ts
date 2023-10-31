import type { NextRequest } from "next/server"
import {
  type Bucket as PrismaBucket,
  type Item as PrismaItem,
} from "@prisma/client"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { type Bucket, type Item, type Result, type WithRelation } from "@/types"
import * as bucketService from "./buckets.service"

const bucketMapper = <T extends Bucket>(bucket: PrismaBucket): T => {
  const { createdAt, updatedAt, ...rest } = bucket
  return rest as T
}

const itemMapper = (item: PrismaItem) => {
  const { createdAt, updatedAt, id, bucketId, ...rest } = item
  return rest
}

const getBucketData = (data: unknown) => {
  return data &&
    typeof data === "object" &&
    ["title", "slug", "status"].every((key) => Object.keys(data).includes(key))
    ? (data as Omit<Bucket, "id">)
    : null
}

// export async function listBuckets(): Promise<NextResponse<Result<Bucket[]>>> {
//   try {
//     const buckets = await prisma.bucket.findMany({})

//     return NextResponse.json(
//       { success: true, data: buckets.map(bucketMapper) },
//       { status: 200 },
//     )
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: JSON.stringify(error) },
//       { status: 500 },
//     )
//   }
// }

export const listBuckets = async (): Promise<NextResponse<Result<Bucket[]>>>  => {
  // Kalle service-laget
  const buckets = await bucketService.list()
}

// GET
// /api/buckets
export const listBuckets = async (filter?: {
  status: string | null
}): Promise<NextResponse<Result<Bucket[]>>> => {
  const buckets = await bucketService.list(filter)

  if (!buckets.success)
    return NextResponse.json(
      {
        success: false,
        error: buckets.error,
      },
      { status: 500 },
    )

  return NextResponse.json(buckets, { status: 200 })
}

// POST
// /api/buckets
export const createBucket = async (
  req: NextRequest,
): Promise<NextResponse<Result<Bucket>>> => {
  const contentType = req.headers.get("content-type")
  if (contentType !== "application/json") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 415 },
    )
  }
  const body = await req.json()
  const bucketData = getBucketData(body)

  if (!bucketData)
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields title, slug, status",
      },
      { status: 400 },
    )

  const { title, slug, status, description } = bucketData

  const createdBucket = await bucketService.create({
    title,
    slug,
    status,
    description,
  })

  if (!createdBucket.success) {
    switch (createdBucket.type) {
      case "Bucket.Duplicate":
        return NextResponse.json(
          {
            success: false,
            error: createdBucket.error,
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            success: false,
            error: createdBucket.error,
          },
          { status: 500 },
        )
    }
  }

  return NextResponse.json(createdBucket, { status: 201 })
}

// export async function createBucket(
//   request: NextRequest,
// ): Promise<NextResponse<Result<Bucket>>> {
//   try {
//     const body = (await request.json()) as Bucket | null

//     if (!body || (typeof body === "object" && !Object.keys(body).length))
//       return NextResponse.json(
//         {
//           success: false,
//           error: `Missing required fields`,
//         },
//         { status: 400 },
//       )

//     const bucket = await prisma.bucket.create({
//       data: { ...body, status: body.status ?? "draft" },
//     })

//     return NextResponse.json(
//       { success: true, data: bucketMapper(bucket) },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json(
//       { success: false, error: JSON.stringify(error) },
//       { status: 500 },
//     )
//   }
// }

export async function getBucketById(
  request: NextRequest,
  id: string,
): Promise<NextResponse<Result<Bucket | null>>> {
  try {
    const bucket = await prisma.bucket.findUnique({ where: { id } })

    if (!bucket) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    return NextResponse.json(
      { success: true, data: bucketMapper(bucket) },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}

export async function updateBucketById(
  request: NextRequest,
  id: string,
): Promise<NextResponse<Result<Bucket | null>>> {
  try {
    const bucket = await prisma.bucket.findUnique({ where: { id } })

    if (!bucket) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }
    const body = await request.json()
    if (!body || (typeof body === "object" && !Object.keys(body).length))
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields`,
        },
        { status: 400 },
      )

    const updatedBucket = await prisma.bucket.update({
      where: { id },
      data: body as Bucket,
    })

    return NextResponse.json(
      { success: true, data: bucketMapper(updatedBucket) },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}

export function deleteBucketById(request: NextRequest, id: string) {
  return NextResponse.json({}, { status: 204 })
}

export async function createBucketItem(
  request: NextRequest,
  id: string,
): Promise<
  NextResponse<
    Result<WithRelation<
      Bucket,
      { items: Pick<Item, "name" | "slug">[] }
    > | null>
  >
> {
  try {
    const bucket = await prisma.bucket.findUnique({ where: { id } })

    if (!bucket) {
      return NextResponse.json({ success: true, data: null }, { status: 404 })
    }

    const body = await request.json()
    if (!body || (typeof body === "object" && !Object.keys(body).length))
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields`,
        },
        { status: 400 },
      )

    const updatedBucket = await prisma.bucket.update({
      where: { id },
      data: {
        items: {
          create: body as Item,
        },
      },
      include: {
        items: true,
      },
    })

    const mappedBucket =
      bucketMapper<WithRelation<Bucket, { items: PrismaItem[] }>>(updatedBucket)

    return NextResponse.json(
      {
        success: true,
        data: { ...mappedBucket, items: mappedBucket.items.map(itemMapper) },
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 },
    )
  }
}
