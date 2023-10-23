import BucketActions from "@/features/buckets/BucketActions"
import BucketContent from "@/features/buckets/BucketContent"
import BucketItem from "@/features/buckets/BucketItem"
import prisma from "@/lib/prisma"

export default async function BucketPage(props: { params: { id: string } }) {
  const id = props.params.id
  const bucket = await prisma.bucket.findUnique({ where: { id } })
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
