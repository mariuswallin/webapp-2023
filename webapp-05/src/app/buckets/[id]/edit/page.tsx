import BucketForm from "@/features/buckets/BucketForm"
import prisma from "@/lib/prisma"

export default async function BucketEditPage(props: {
  params: { id: string }
}) {
  const id = props.params.id
  const bucket = await prisma.bucket.findUnique({ where: { id } })
  return <BucketForm initialData={bucket} />
}
