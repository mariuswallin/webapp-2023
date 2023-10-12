import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import { type Question } from "./types"

// This functional component represents a multi-step survey with radio buttons and checkboxes.
// It takes 'questions' as an array of objects, where each object represents a question
// with an 'id', 'title', 'type' (radio or checkbox), and 'answers' array containing answer options.
// It also takes 'onSubmit' as a function to handle form submission with selected answers.
export function MultiSurvey({
  questions,
  onSubmit,
}: {
  questions: Question[]
  onSubmit: (data: Record<string, string | string[]>) => void
}) {
  // State to keep track of the current question index and selected answers
  const [current, setCurrent] = useState(0)
  const [response, setResponse] = useState<Record<string, string | string[]>>(
    {},
  )
  // Get the current question based on the 'current' index
  const currentQuestion = questions[current]

  // Function to handle the selection of an answer for a question
  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name // Get the question's 'id'
    const id = e.target.id // Get the selected answer's 'id'
    const type = e.target.type as Question["type"] // Get the question type (radio or checkbox)

    switch (type) {
      case "radio":
        setResponse((prev) => ({ ...prev, [name]: id })) // Update selected answer for radio buttons
        break
      case "checkbox": {
        let arr: string[] = []
        const selectedValue = response[name]

        if (selectedValue && Array.isArray(selectedValue)) {
          // Initialize the arr with selectedValue (and allow for typing to be correct)
          arr = selectedValue
        }
        // Filter out if the selected value is already selected
        const updatedSelection = arr.includes(id)
          ? arr.filter((v) => v !== id)
          : [...arr, id]

        setResponse((prev) => ({ ...prev, [name]: updatedSelection })) // Update selected answers for checkboxes
        break
      }
      default:
        console.error("Type not implemented")
        break
    }
  }

  // Function to handle navigation between survey questions
  function handleStep(action: "prev" | "next") {
    switch (action) {
      case "next":
        setCurrent((prev) => (current + 1 < questions.length ? prev + 1 : 0)) // Move to the next question or wrap around to the first
        break
      default:
        setCurrent((prev) =>
          current - 1 >= 0 ? prev - 1 : questions.length - 1,
        ) // Move to the previous question or loop to the last one
    }
  }

  // Function to handle form submission
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(response) // Pass the selected answers to the onSubmit function
  }

  return (
    <form className="my-10" onSubmit={handleSubmit}>
      <section className="mt-2">
        <h3 className="text-md font-bold">{currentQuestion.title}</h3>
        <span className="text-sm text-slate-200">{currentQuestion.id}</span>
        <fieldset className="flex max-w-fit flex-col gap-2">
          {/* Map through answer options for the current question */}
          {currentQuestion.answers.map((answer) => (
            <div className="flex gap-2" key={answer.id}>
              <input
                name={currentQuestion.id} // Use the question's 'id' as the input's 'name'
                id={answer.id}
                type={currentQuestion.type}
                onChange={handleSelect}
                checked={
                  Array.isArray(response[currentQuestion.id])
                    ? response[currentQuestion.id].includes(answer.id)
                    : response[currentQuestion.id] === answer.id
                } // Check if this answer is selected
              />
              <label htmlFor={answer.id}>{answer.title}</label>
            </div>
          ))}
        </fieldset>
      </section>
      <div className="mt-2 flex gap-2">
        {/* Buttons to navigate between questions */}
        <button
          type="button"
          className="rounded border bg-slate-200 px-2 py-1"
          onClick={() => {
            handleStep("prev") // Move to the previous question
          }}
        >
          Forrige
        </button>
        <button
          type="button"
          className="rounded border bg-slate-600 px-2 py-1 text-white"
          onClick={() => {
            handleStep("next") // Move to the next question
          }}
        >
          Neste
        </button>
      </div>
      <button className="mt-8 rounded border-none bg-green-600 px-3 py-2 text-white">
        Send
      </button>
      {/* Button to submit the survey */}
    </form>
  )
}
