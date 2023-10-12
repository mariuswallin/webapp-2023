import "react"
import type { FormEvent, ReactNode } from "react"

import { useAnswerContext } from "./AnswerContext"
import { useQuestionContext } from "./QuestionContext"

export function SurveyForm({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: (data: Record<string, string | string[]>) => void
}) {
  const { responses } = useAnswerContext()
  const { isFinalQuestion } = useQuestionContext()
  // Function to handle form submission
  console.log("Render SurveyForm")
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit(responses) // Pass the selected answers to the onSubmit function
  }
  return (
    <form className="my-10" onSubmit={handleSubmit}>
      {children}
      {isFinalQuestion ? (
        <button className="mt-8 rounded border-none bg-green-600 px-3 py-2 text-white">
          Send
        </button>
      ) : null}
    </form>
  )
}
