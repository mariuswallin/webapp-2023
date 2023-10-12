import { useState } from "react"
import type { ChangeEvent } from "react"

import { type Question } from "./types"

export function useAnswer() {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {},
  )
  // Function to handle the selection of an answer for a question
  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name // Get the question's 'id'
    const id = e.target.id // Get the selected answer's 'id'
    const type = e.target.type as Question["type"] // Get the question type (radio or checkbox)

    switch (type) {
      case "radio":
        setResponses((prev) => ({ ...prev, [name]: id })) // Update selected answer for radio buttons
        break
      case "checkbox": {
        let arr: string[] = []
        const selectedValue = responses[name]

        if (selectedValue && Array.isArray(selectedValue)) {
          // Initialize the arr with selectedValue (and allow for typing to be correct)
          arr = selectedValue
        }
        // Filter out if the selected value is already selected
        const updatedSelection = arr.includes(id)
          ? arr.filter((v) => v !== id)
          : [...arr, id]

        setResponses((prev) => ({ ...prev, [name]: updatedSelection })) // Update selected answers for checkboxes
        break
      }
      default:
        console.error("Type not implemented")
        break
    }
  }
  return { handleSelect, responses }
}
