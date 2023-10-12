// Importing the 'useState' hook and the 'ChangeEvent' type from React library.
import { useState } from "react"
import type { ChangeEvent } from "react"

// Defining a type 'UseFilterProps' which specifies that 'params' should have 'key' and 'data' properties.
type UseFilterProps<T extends Record<string, unknown>> = {
  key: string
  data: T[]
}

// Exporting a custom hook 'useFilter' which takes 'params' of type 'UseFilterProps'.
export default function useFilter<T extends Record<string, unknown>>(
  params: UseFilterProps<T>,
) {
  // Destructuring 'data' and 'key' from 'params'.
  const { data, key } = params

  // Initializing state variable 'filterValue' and its updater function 'setFilterValue' using 'useState'.
  const [filterValue, setFilterValue] = useState("")

  // Filtering the 'data' based on 'filterValue' and 'key'.
  const filteredData = filterValue
    ? data.filter((item) => key in item && item[key] === filterValue)
    : data

  // Event handler function for the select input's change event.
  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // Updating the 'filterValue' state with the selected value.
    setFilterValue(value)
  }

  // Function to reset the filter by setting 'filterValue' back to an empty string.
  const resetFilter = () => {
    setFilterValue("")
  }

  // Returning an object with properties and functions to be used in the component.
  return {
    data: filteredData, // Filtered data based on the current 'filterValue'.
    handleFilter, // Event handler for the filter select input.
    filter: filterValue, // The current filter value.
    resetFilter, // Function to reset the filter.
  }
}
