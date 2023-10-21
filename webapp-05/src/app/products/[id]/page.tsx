import { revalidatePath } from "next/cache"

import { getById, putById } from "@/features/example/product.service"

export default async function ProductPage(props: { params: { id: string } }) {
  const id = props.params.id
  const product = await getById({ id })
  const publish = async () => {
    "use server"
    await putById(id, { status: "published" })
    revalidatePath("/")
  }
  return (
    <main>
      {JSON.stringify(product)}
      <form action={publish}>
        <button>Publisere</button>
      </form>
    </main>
  )
}
