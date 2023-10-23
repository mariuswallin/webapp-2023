export type Item = {
  id: string
  name: string
  slug: string
}

export type Bucket = {
  id: string
  title: string
  description: string | null
  status?: string
}

export type WithRelation<T, U> = T & U

export type Data<T> = {
  success: true
  data: T | null
}

export type ResultError = {
  success: false
  type?: string
  error: string
}

export type Result<T> = Data<T> | ResultError
