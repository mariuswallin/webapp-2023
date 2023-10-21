export type Product = {
  id?: string
  sku: string
  name: string
  description?: string | null
  price: number
  status?: string
}

export type Cart = { id?: string; items?: CartItem<Product>[] }

export type CartItem<T> = {
  quantity: number
  product: T
}

export type Entity<T> = T & { id: string }

export type Data<T> = {
  success: true
  data: T
}

export type Error = {
  success: false
  type?: string
  error: string
}

export type Result<T> = Data<T> | Error

export type QueryParams = {
  status?: string
  limit?: string
  skip?: string
}

export type WithPagination<T> = {
  hasMore: boolean
  current: string
  data: T
}
