import { type Data, type Result, type ResultError } from "@/types"

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
): Promise<Result<TResponse>> => {
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
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json")
  const data = isJson ? ((await response.json()) as Data<TResponse>) : null
  if (!response.ok) {
    let error = ""
    if (data && typeof data === "object" && "error" in data && data.error) {
      error = data.error as string
    }
    error = error ? error : response.statusText
    return Promise.reject({
      success: false,
      error: error,
    } as ResultError)
  }

  return { success: true, data: data ? data.data : null }
}
