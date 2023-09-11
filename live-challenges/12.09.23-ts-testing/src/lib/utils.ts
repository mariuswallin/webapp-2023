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
  return `http://localhost:${process.env.PORT ?? 3000}`
}
