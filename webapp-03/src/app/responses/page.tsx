"use client"

import { useEffect, useState } from "react"
import type { FilterOption } from "@/hooks/useMultiFilter"

import { Filter } from "@/components/Filter"
import ResponseItem from "@/components/ResponseItem"
import Responses from "@/components/Responses"
import { TableHead } from "@/components/Table/TableHead"
import { type Response } from "@/features/responses/types"
import { useMultiFilter } from "@/hooks/useMultiFilter"

export default function ResponsePage() {
  const [responses, setResponses] = useState<Response[]>([])

  const filterOptions: FilterOption<Response>[] = [
    {
      key: "score",
      label: "Score",
      values: (items) => items.map((item) => item.score),
    },
    {
      key: "category",
      label: "Kategori",
      values: (items) => items.map((item) => item.category),
    },
  ]
  const { data, handleFilter, filter, resetFilter, options } =
    useMultiFilter<Response>({
      options: filterOptions,
      data: responses,
    })

  const calcAverageScore = (responses: Response[]) => {
    const total = responses.reduce((sum, response) => {
      return sum + response.score
    }, 0)
    return (total / responses.length).toFixed(2)
  }

  useEffect(() => {
    const getResponses = async () => {
      const response = await fetch("/api/responses", {
        method: "get",
      })
      const result = (await response.json()) as { data: Response[] }
      setResponses(result.data)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getResponses()
  }, [])

  const handleDelete = (id: string) => {
    setResponses((prev) => prev.filter((response) => response.id !== id))
  }

  if (!responses.length) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <p>Ingen responser</p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl">
      <section className="flex gap-4">
        {filterOptions.map((option) => (
          <Filter
            key={option.key}
            id={option.key}
            filterValue={filter[option.key]}
            options={options[option.key]}
            label={option.label}
            onChange={(e) => {
              handleFilter(e, option.key)
            }}
            onSubmit={(e) => {
              e.preventDefault()
              resetFilter(option.key)
            }}
          />
        ))}
      </section>
      <Responses>
        <TableHead headers={[...Object.keys(responses[0]), "Actions"]} />
        <tbody>
          {!data.length ? (
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td
                colSpan={5}
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Ingen data. Vennligst justere filteret
              </td>
            </tr>
          ) : null}
          {data.map((response) => (
            <ResponseItem
              key={response.id}
              onDelete={handleDelete}
              {...response}
            />
          ))}
          {data.length ? (
            <ResponseItem
              id={""}
              score={calcAverageScore(data)}
              questionId=""
              answer=""
              category=""
            />
          ) : null}
        </tbody>
      </Responses>
    </div>
  )
}
