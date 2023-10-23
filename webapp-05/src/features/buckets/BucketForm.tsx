"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type { Method } from "./useFetch"
import { useRouter } from "next/navigation"

import createId from "@/lib/id"
import { type Bucket, type Result } from "@/types"
import useFetch from "./useFetch"

export default function ProductForm({
  initialData,
}: {
  initialData: Bucket | null
}) {
  const { run, error, isError, isLoading, data, setError } = useFetch()
  const validForm = (form: Bucket) => {
    return form.title.length > 2
  }

  const [form, setForm] = useState<Bucket>({
    id: createId(),
    title: "",
    description: "",
    status: "draft",
    ...(initialData ?? {}),
  })

  const router = useRouter()

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { url, method }: { url: string; method: Method } = initialData
      ? {
          url: `/api/buckets/${initialData.id}`,
          method: "put",
        }
      : {
          url: `/api/buckets`,
          method: "post",
        }

    if (!validForm(form)) {
      setError("Invalid form")
      return
    }
    const result = await run<Result<Bucket>>(url, method, {
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (result?.success) {
      setTimeout(() => {
        router.push(`/buckets/${result.data?.id}`)
      }, 2000)
    }
  }

  const handleFormUpdate = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const name = event.target.name
    const value = event.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form
      onSubmit={handleSumbit}
      className="mx-auto mt-5 flex max-w-lg flex-col gap-3"
    >
      <div className="flex flex-col  gap-2">
        <label className="font-bold" htmlFor="title">
          Tittel
        </label>
        <input
          name="title"
          id="title"
          value={form.title}
          onChange={handleFormUpdate}
        />
      </div>
      <div className="flex flex-col  gap-2">
        <label className="font-bold" htmlFor="description">
          Description
        </label>
        <input
          name="description"
          id="description"
          value={form.description ?? ""}
          onChange={handleFormUpdate}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          onChange={handleFormUpdate}
          value={form.status}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <button
        className="max-w-fit self-start rounded bg-blue-600 px-2 py-2 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Sender..." : "Lagre"}
      </button>
      {isError ? <p data-testid="form-error">{error}</p> : null}
      {data ? <p data-testid="form-success">Sendt</p> : null}
    </form>
  )
}
