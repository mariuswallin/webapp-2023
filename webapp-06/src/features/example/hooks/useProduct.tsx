import { PRODUCT_API_URL } from "@/lib/constants"
import { fetcher } from "@/lib/fetch"
import { type Entity, type Product, type WithPagination } from "@/types"

export function useProduct() {
  const url = PRODUCT_API_URL

  const list = async (params?: Record<string, string | string[]>) => {
    console.log("List", params)
    const result = await fetcher<WithPagination<Entity<Product>[]>>({
      url,
      method: "get",
      filter: params,
    })

    if (
      "data" in result &&
      result.data &&
      result.data.current === "2" &&
      url.includes("published")
    )
      throw new Error("Invalid skip client")
    return result.success ? result.data : result.error
  }

  const update = (id: string) => {
    console.log("Updating", id)
  }

  const remove = async (id: string) => {
    console.log("Removing", id)
    const result = await fetcher<null>({
      url: `${url}/${id}`,
      method: "delete",
    })
    return result.success ? result.data : result.error
  }

  const create = async (body: Product) => {
    console.log("Creating")
    const result = await fetcher<Entity<Product>, Product>({
      url,
      method: "post",
      body,
    })
    return result.success ? result.data : result.error
  }

  const publish = (id: string) => {
    console.log("Publishing", id)
  }

  const get = async (id: string) => {
    console.log("Getting", id)
    const result = await fetcher<Entity<Product>>({
      url: `${url}/${id}`,
      method: "get",
    })
    return result.success ? result.data : result.error
  }

  return { get, list, remove, update, publish, create }
}

export default useProduct
