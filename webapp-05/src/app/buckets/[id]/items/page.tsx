import prisma from "@/lib/prisma"

export default async function BucketItemsPage(props: {
  params: { id: string }
}) {
  const id = props.params.id
  const bucket = await prisma.bucket.findUnique({
    where: { id },
    include: { items: true },
  })
  return (
    <main className="mx-auto mt-3 max-w-2xl">{JSON.stringify(bucket)}</main>
  )
}
