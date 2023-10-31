import BucketForm from "@/features/buckets/BucketForm"
import prisma from "@/lib/prisma"

export default async function BucketEditPage(props: {
  params: { slug: string }
}) {
  const slug = props.params.slug
  const bucket = await prisma.bucket.findUnique({ where: { slug } })
  return <BucketForm initialData={bucket} />
}
