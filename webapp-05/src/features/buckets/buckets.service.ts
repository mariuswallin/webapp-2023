import { type Bucket, type Result } from "@/types"
import * as bucketsRepo from "./buckets.repository"

export const list = async () => {
  return true
}

// export const list = async (filter?: {
//   status: string | null
// }): Promise<Result<Bucket[]>> => {
//   const buckets = await bucketsRepo.findMany(filter)

//   if (!buckets.success) return { success: false, error: buckets.error }

//   return { success: true, data: buckets.data }
// }

export const create = async ({
  title,
  status,
  slug,
  description,
}: Omit<Bucket, "id">): Promise<Result<Bucket>> => {
  const bucket = await bucketsRepo.exist({ slug: slug })
  if (!bucket.success) return { success: false, error: bucket.error }

  if (bucket.data) {
    return {
      success: false,
      type: "Bucket.Duplicate",
      error: `Item with ${slug} already exist`,
    }
  }

  // sender nødvendig data for å lage en survey
  const createdSurvey = await bucketsRepo.create({
    slug,
    title,
    status,
    description,
  })

  if (!createdSurvey.success) {
    return { success: false, error: createdSurvey.error }
  }

  return { success: true, data: createdSurvey.data }
}
