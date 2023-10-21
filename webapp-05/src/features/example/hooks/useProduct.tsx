import { fetcher } from "@/lib/fetch"
import { getBaseUrl } from "@/lib/utils"
import { type Entity, type Product, type WithPagination } from "@/types"

function useProduct() {
  const url = `${getBaseUrl()}/api/products`

  const list = async (params?: Record<string, string | string[]>) => {
    const result = await fetcher<WithPagination<Entity<Product>[]>>({
      url,
      method: "get",
      filter: params,
    })
    if (
      result.success &&
      result.data.current === "2" &&
      url.includes("published")
    )
      throw new Error("Invalid skip client")
    console.log("List")
    return result.success ? result.data : result.error
  }

  const update = (id: string) => {
    console.log("Updating")
  }

  const remove = async (id: string) => {
    console.log("Removing")
    const result = await fetcher<null>({
      url: `${url}/${id}`,
      method: "delete",
    })
    return result.success ? result.data : result.error
  }

  const create = async (body: Product) => {
    console.log("Create")
    const result = await fetcher<Entity<Product>, Product>({
      url,
      method: "post",
      body,
    })
    return result.success ? result.data : result.error
  }

  const publish = (id: string) => {
    console.log("Publishing")
  }

  return { list, remove, update, publish, create }
}

export default useProduct
