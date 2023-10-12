import { type ReactNode } from "react"

import { useQuestionContext } from "./QuestionContext"

export function SurveyQuestion({ children }: { children: ReactNode }) {
  const { currentQuestion } = useQuestionContext()
  console.log("Render SurveyQuestion")
  return (
    <section className="mt-2">
      <h3 className="text-md font-bold">{currentQuestion.title}</h3>
      <span className="text-sm text-slate-200">{currentQuestion.id}</span>
      {/* Using children to be more flexible on what to render */}
      {children}
    </section>
  )
}
