import { useState } from "react"
import type { ChangeEvent } from "react"

type UseFilterProps<T extends Record<string, unknown>> = {
  key: string
  data: T[]
}
export default function useFilter<T extends Record<string, unknown>>(
  params: UseFilterProps<T>,
) {
  const { data, key } = params
  const [filterValue, setFilterValue] = useState("")
  const filteredData = filterValue
    ? data.filter((item) => key in item && item[key] === filterValue)
    : data

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFilterValue(value)
  }

  const resetFilter = () => {
    setFilterValue("")
  }

  return {
    data: filteredData,
    handleFilter,
    filter: filterValue,
    resetFilter,
  }
}
