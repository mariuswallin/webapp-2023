import { useAnswerContext } from "./AnswerContext"
import { useQuestionContext } from "./QuestionContext"

export function SurveyAnswers() {
  const { currentQuestion } = useQuestionContext()
  const { responses, handleSelect } = useAnswerContext()

  console.log("Render SurveyAnswers")
  return (
    <>
      <fieldset className="flex max-w-fit flex-col gap-2">
        {/* Map through answer options for the current question */}
        {currentQuestion.answers.map((answer) => (
          <div className="flex gap-2" key={answer.id}>
            {/* Could be it`s own component - See SurveyAnswer */}
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
      {/* A simple way to show what has been selected (for debugging) */}
      <section className="rounded border px-4 py-6">
        <h5 className="my-3 mt-12 font-bold">Dine svar er: </h5>
        <ul className="mt-2">
          {Object.entries(responses).map(([key, value]) => (
            <li key={key}>
              key: {key} | value:{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
