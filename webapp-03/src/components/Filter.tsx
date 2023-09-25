import "react"

import type { ChangeEventHandler, FormEventHandler } from "react"

export function Filter(props: {
  filterValue: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  id: string
  label: string
  options: string[]
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  const { id, label, options, filterValue, onChange, onSubmit } = props

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1 ">
      <label className="font-bold" htmlFor={id}>
        {label}
      </label>
      <div className="flex gap-1">
        <select
          className="max-w-fit"
          id={id}
          value={filterValue}
          onChange={onChange}
        >
          <option value="" disabled>
            Choose filter
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {filterValue ? (
          <button className="flex items-center justify-center border border-red-300 px-4 text-red-600">
            X
          </button>
        ) : null}
      </div>
    </form>
  )
}
