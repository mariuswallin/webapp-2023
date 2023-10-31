import prisma from "@/lib/prisma"

export default async function BucketItemsPage(props: {
  params: { slug: string }
}) {
  const slug = props.params.slug
  const bucket = await prisma.bucket.findUnique({
    where: { slug },
    include: { items: true },
  })
  return (
    <main className="mx-auto mt-3 max-w-2xl">{JSON.stringify(bucket)}</main>
  )
}
