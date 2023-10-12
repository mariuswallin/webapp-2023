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
  const { responses, postResponses, isLoading, result } = useAnswerContext()
  const { isFinalQuestion } = useQuestionContext()

  console.log("Render SurveyForm")
  // Function to handle form submission
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Example showing how to use the method from answer-context to post responses
    const data = await postResponses(responses)
    console.log(data)
    //onSubmit(responses) // Pass the selected answers to the onSubmit function
  }

  // Fallback to show that a request is beeing triggered
  if (isLoading) return <p>Sender ...</p>

  return (
    <form className="my-10" onSubmit={handleSubmit}>
      {/* Using children to be more flexible on what to render inside the form */}
      {children}
      {/* Ternary conditional based on the value of isFinalQuestion (true or false) */}
      {isFinalQuestion ? (
        <button className="mt-8 rounded border-none bg-green-600 px-3 py-2 text-white">
          Send
        </button>
      ) : null}
      {/* Example showing the result from REST-API */}
      <p>Resultat: {JSON.stringify(result)}</p>
    </form>
  )
}
