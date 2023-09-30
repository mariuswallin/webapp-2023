// Importing React and relevant types.
import "react"

import type { ChangeEventHandler, FormEventHandler } from "react"

// Defining a functional component 'Filter'.
export function Filter(props: {
  filterValue: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  id: string
  label: string
  options: string[]
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  // Destructuring props for ease of use.
  const { id, label, options, filterValue, onChange, onSubmit } = props

  // Rendering a form component with label, select input, and optional reset button.
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1">
      {/* Label for the select input */}
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="flex gap-1">
        {/* Select input for filtering */}
        <select
          className="max-w-fit"
          id={id}
          value={filterValue}
          onChange={onChange}
        >
          <option value="" disabled>
            Choose filter
          </option>
          {/* Mapping over options to generate select input options */}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* Conditional rendering of reset button */}
        {filterValue ? (
          <button className="flex items-center justify-center border border-red-300 px-4 text-red-600">
            X
          </button>
        ) : null}
      </div>
    </form>
  )
}
