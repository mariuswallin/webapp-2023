"use client"

import { useState } from "react"

export type Method = "post" | "get" | "put" | "delete"

const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("idle")
  const isLoading = status === "loading"
  const isError = status === "error" || error

  const run = async <U extends T>(
    url: string,
    method: Method,
    options?: RequestInit,
  ) => {
    setStatus("loading")
    try {
      const response = await fetch(url, { method, ...options })
      console.log("RUN")
      const result = (await response.json()) as U
      console.log("RESULT", result)
      setData(result)
      return result
    } catch (e) {
      console.error(e)
      setStatus("error")
      setError(JSON.stringify(e))
    } finally {
      setStatus("idle")
    }
  }

  return { run, data, error, isLoading, isError, setError }
}
export default useFetch
