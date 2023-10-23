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
  if (process.env.APP_URL)
    return `${process.env.NODE_ENV === "production" ? "https://" : "http://"}${
      process.env.APP_URL
    }`
  return `http://localhost:${
    process.env.PORT ?? process.env.NEXT_PUBLIC_PORT ?? 3000
  }`
}
