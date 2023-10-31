import BucketActions from "@/features/buckets/BucketActions"
import BucketContent from "@/features/buckets/BucketContent"
import BucketItem from "@/features/buckets/BucketItem"
import prisma from "@/lib/prisma"

export default async function BucketPage(props: { params: { slug: string } }) {
  const slug = props.params.slug
  const bucket = await prisma.bucket.findUnique({ where: { slug } })
  return (
    <main className="mx-auto mt-3 max-w-2xl">
      {bucket ? (
        <BucketItem bucket={bucket}>
          <BucketContent />
          <BucketActions />
        </BucketItem>
      ) : (
        <p>Fant ikke bucket</p>
      )}
    </main>
  )
}
