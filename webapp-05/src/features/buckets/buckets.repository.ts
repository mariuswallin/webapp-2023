import prisma from "@/lib/prisma"
import { type Bucket, type Result } from "@/types"

export const findMany = async (filter?: {
  status: string | null
}): Promise<Result<Bucket[]>> => {
  try {
    const buckets = filter?.status
      ? await prisma.bucket.findMany({
          where: { status: filter.status },
        })
      : await prisma.bucket.findMany()

    return { success: true, data: buckets }
  } catch (error) {
    return { success: false, error: "Failed finding buckets" }
  }
}

export const create = async ({
  title,
  status,
  slug,
  description,
}: Omit<Bucket, "id">): Promise<Result<Bucket>> => {
  try {
    const bucket = await prisma.bucket.create({
      data: {
        title,
        slug,
        status: status ?? "draft",
        description,
      },
    })

    return { success: true, data: bucket }
  } catch (error) {
    return { success: false, error: "Failed creating bucket" }
  }
}

export const exist = async (
  identifier:
    | {
        id: string
      }
    | { slug: string },
): Promise<Result<Bucket | null>> => {
  try {
    const bucket = await prisma.bucket.findUnique({
      where: {
        ...identifier,
      },
    })

    return { success: true, data: bucket }
  } catch (error) {
    return { success: false, error: "Failed finding bucket" }
  }
}
