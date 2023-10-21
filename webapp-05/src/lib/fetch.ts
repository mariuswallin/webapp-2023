import { type Result } from "@/types"

export type Method = "get" | "options" | "post" | "put" | "patch" | "delete"

export type Fetcher<TBody> = {
  url: string
  method: Method
  options?: RequestInit
  body?: TBody
  filter?: Record<string, string | string[]>
}

const transformFilter = (filter: Record<string, string | string[]>) => {
  const handleArray = (key: string, values: string[]) => {
    return values.map((v) => `${key}=${v}`)
  }

  return Object.entries(filter)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      if (Array.isArray(value)) return handleArray(key, value).join("&")
      return { [key]: value }
    })
    .filter(Boolean)
    .map((v) => new URLSearchParams(v))
    .join("&")
}

export const fetcher = async <TResponse, TBody = never>(
  props: Fetcher<TBody>,
) => {
  const { url: baseUrl, method, options, body, filter } = props
  let url = baseUrl
  const requestOptions: RequestInit = {
    method,
    ...options,
  }

  if (body) {
    requestOptions.headers = { "Content-Type": "application/json" }
    requestOptions.body = JSON.stringify(body)
  }

  if (filter) {
    url = `${url}?${transformFilter(filter)}`
  }

  const response = await fetch(url, requestOptions)
  const result = (await response.json()) as Result<TResponse>
  return result
}
