import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}`
}

export const paginate = <T>(
  items: T[],
  options: { page: number; limit: number },
) => {
  const { page = 1, limit = 10 } = options
  const skipFrom = page * limit - limit
  const total = items.length
  const data = items.slice(skipFrom, skipFrom + limit)

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
  }
}
