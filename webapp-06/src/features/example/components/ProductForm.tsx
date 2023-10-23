"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"

import { ValidationError } from "@/lib/errors"
import { type Product } from "@/types"
import { useProduct } from "../hooks/useProduct"
import { Product as CreateProduct } from "../product"

export default function ProductForm() {
  const { create } = useProduct()
  const [form, setForm] = useState<Product>({ name: "", sku: "", price: 0 })
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")
  const isLoading = status === "loading"
  const isValidationError = status === "validation"
  const isError = status === "error"
  const isSuccess = status === "success"
  const router = useRouter()

  const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let id = ""

    try {
      setStatus("loading")
      const product = CreateProduct(form)

      const result = await create(product)
      if (typeof result === "string") {
        setStatus("error")
        setError(result)
        return
      }
      setStatus("success")
      id = result.id
      setTimeout(() => {
        router.push(`/products/${id}`)
      }, 2000)
    } catch (error) {
      if (error instanceof ValidationError) {
        setStatus("validation")
        setError(error.message)
        return
      }
      setStatus("error")
    }
  }

  const handleFormUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSumbit} className=" flex max-w-lg flex-col gap-3">
      <div className="flex flex-col  gap-2">
        <label className="font-bold" htmlFor="name">
          Navn
        </label>
        <input
          name="name"
          id="name"
          value={form.name}
          onChange={handleFormUpdate}
        />
      </div>
      <div className="flex flex-col  gap-2">
        <label className="font-bold" htmlFor="sku">
          Sku
        </label>
        <input
          name="sku"
          id="sku"
          value={form.sku}
          onChange={handleFormUpdate}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="price">
          Pris
        </label>
        <input
          name="price"
          type="number"
          id="price"
          value={form.price}
          onChange={handleFormUpdate}
        />
      </div>
      <button
        className="max-w-fit self-start rounded bg-blue-600 px-2 py-2 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Sender..." : "Lagre"}
      </button>
      {isValidationError ? (
        <p data-testid="form_validation_error">Form is invalid</p>
      ) : null}
      {isError ? <p data-testid="form-error">{error}</p> : null}
      {isSuccess ? <p data-testid="form-success">Sendt</p> : null}
    </form>
  )
}
