import { useState } from "react"
import type { ChangeEvent } from "react"

export type FilterOption<T extends Record<string, unknown>> = {
  key: keyof T
  label: string
  values: (items: T[]) => (string | number)[]
}

type UseMultFilterProps<T extends Record<string, unknown>> = {
  options: FilterOption<T>[]
  data: T[]
}

export function useMultiFilter<T extends Record<string, unknown>>(
  params: UseMultFilterProps<T>,
) {
  const { data, options } = params
  const [filterValue, setFilterValue] = useState(
    Object.fromEntries(options.map((option) => [option.key, ""])),
  )

  const uniqueOptions = Object.fromEntries(
    Object.keys(filterValue).map((filter) => [
      filter,
      [
        ...new Set(
          options
            .map((option) =>
              option.key === filter
                ? option.values(data).map((value) => value)
                : null,
            )
            .filter(Boolean)
            .flat(Infinity),
        ),
      ],
    ]),
  )

  const activeFilters = Object.entries(filterValue).filter(
    ([_, value]) => !!value,
  )

  const filteredData =
    activeFilters.length > 0
      ? data.filter((item) =>
          activeFilters.every(
            ([key, value]) => item[key]?.toString() === value.toString(),
          ),
        )
      : data

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>, key: string) => {
    const value = e.target.value
    setFilterValue((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilter = (key: keyof T) => {
    setFilterValue((prev) => ({ ...prev, [key]: "" }))
  }

  return {
    data: filteredData,
    handleFilter,
    filter: filterValue,
    resetFilter,
    options: uniqueOptions,
  }
}
