import type { Answer, Question } from "./types"

import { useAnswerContext } from "./AnswerContext"
import "./types"

export function SurveyAnswer({
  currentQuestion,
  answer,
}: {
  currentQuestion: Question
  answer: Answer
}) {
  const { responses, handleSelect } = useAnswerContext()
  console.log("Render SurveyAnswer")
  return (
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
  )
}
