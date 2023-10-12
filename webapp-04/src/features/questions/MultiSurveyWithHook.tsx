import { type FormEvent } from "react"

import { type Question } from "./types"
import { useAnswer } from "./useAnswer"
import { useQuestion } from "./useQuestion"

export function MultiSurveyWithHook({
  questions,
  onSubmit,
}: {
  questions: Question[]
  onSubmit: (data: Record<string, string | string[]>) => void
}) {
  // Extract needed logic from custom hooks
  const { handleStep, currentQuestion } = useQuestion(questions)
  const { handleSelect, responses } = useAnswer()

  // Function to handle form submission
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(responses) // Pass the selected answers to the onSubmit function
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
                  Array.isArray(responses[currentQuestion.id])
                    ? responses[currentQuestion.id].includes(answer.id)
                    : responses[currentQuestion.id] === answer.id
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
