"use client"

import Link from "next/link"

import { Icons } from "@/components/icons"
import { useBucketContext } from "./BucketContext"
import useFetch from "./useFetch"

const url = "/api/buckets"

export default function BucketActions() {
  const { id } = useBucketContext()
  const { run, isLoading, isError, error } = useFetch()

  const handleRemove = async () => {
    await run(`${url}/${id}`, "delete")
  }

  if (isError) {
    return <p>{error}</p>
  }

  return (
    <div className="flex gap-2">
      <Link
        href={`/buckets/${id}`}
        className="rounded bg-blue-600 p-2 text-sm text-white"
      >
        <Icons.eye className="h-4 w-4" />
      </Link>
      <Link
        href={`/buckets/${id}/edit`}
        className="rounded bg-yellow-300 p-2 text-sm text-black"
      >
        <Icons.pen className="h-4 w-4" />
      </Link>
      <Link
        href={`/buckets/${id}/items`}
        className="rounded bg-purple-600 p-2 text-sm text-white"
      >
        <Icons.layers className="h-4 w-4" />
      </Link>
      <button
        type="button"
        onClick={handleRemove}
        className="rounded bg-red-600 p-2 text-sm text-white"
      >
        {isLoading ? (
          <span>Sletter ...</span>
        ) : (
          <Icons.trash className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
