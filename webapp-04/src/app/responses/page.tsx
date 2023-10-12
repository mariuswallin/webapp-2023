// Importing React and necessary dependencies
"use client"

import { useEffect, useState } from "react"
import type { FilterOption } from "@/hooks/useMultiFilter"

// Importing custom components and types
import { Filter } from "@/components/Filter"
import ResponseItem from "@/components/ResponseItem"
import Responses from "@/components/Responses"
import { TableHead } from "@/components/Table/TableHead"
import { type Response } from "@/features/responses/types"
import { useMultiFilter } from "@/hooks/useMultiFilter"

// Defining the ResponsePage component
export default function ResponsePage() {
  // State to store the responses data
  const [responses, setResponses] = useState<Response[]>([])

  // Filter options for filtering the responses
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

  // Using the custom useMultiFilter hook to handle filtering
  const { data, handleFilter, filter, resetFilter, options } =
    useMultiFilter<Response>({
      options: filterOptions,
      data: responses,
    })

  // Function to calculate the average score of responses
  const calcAverageScore = (responses: Response[]) => {
    const total = responses.reduce((sum, response) => {
      return sum + response.score
    }, 0)
    return (total / responses.length).toFixed(2)
  }

  // Fetch responses data from an API endpoint when the component mounts
  useEffect(() => {
    // Using async/await to be able to handle the promise coming from fetch
    const getResponses = async () => {
      // Using fetch and the url matchin folder (api/responses/route.ts)
      // Using get since that is what this route handles
      const response = await fetch("/api/responses", {
        method: "get",
      })

      // Using a built in method on the fetch-response that converts the "stream" to JSON (object-like data)
      const result = (await response.json()) as { data: Response[] }
      // Using the state-setter to update the state after component is mounted
      setResponses(result.data)
    }

    // Call the fetch function
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getResponses()
  }, [])

  // Function to handle response deletion
  const handleDelete = (id: string) => {
    setResponses((prev) => prev.filter((response) => response.id !== id))
  }

  // What to render if no responses
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
        {/* Using the Filter component with necessary props */}
        {/* Using .map to traverse the filterOptions-array */}
        {filterOptions.map((option) => (
          <Filter
            key={option.key}
            id={option.key}
            filterValue={filter[option.key]}
            options={options[option.key]}
            label={option.label}
            onChange={(e) => {
              handleFilter(e, option.key) // Using the handleFilter that comes from the custom hook
            }}
            onSubmit={(e) => {
              e.preventDefault()
              resetFilter(option.key) // Using the resetFilter that comes from the custom hook
            }}
          />
        ))}
      </section>
      {/* Using "children" in Responses to be able to have the flexibility to add whatever we like */}
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
          {/* Using ResponseItem component and provides necessary props to this component */}
          {data.map((response) => (
            <ResponseItem
              key={response.id}
              onDelete={handleDelete}
              {...response}
            />
          ))}
          {/* Using a final ResponsItem component but only shows the score which is a calculated value */}
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
