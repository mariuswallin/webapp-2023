import { useQuestionContext } from "./QuestionContext"

export function Stepper() {
  const { stepper } = useQuestionContext()
  console.log("Render Stepper")

  return (
    <div className="mt-2 flex gap-2">
      {/* Buttons to navigate between questions */}
      <button
        type="button"
        className="rounded border bg-slate-200 px-2 py-1"
        onClick={() => {
          stepper("prev") // Move to the previous question
        }}
      >
        Forrige
      </button>
      <button
        type="button"
        className="rounded border bg-slate-600 px-2 py-1 text-white"
        onClick={() => {
          stepper("next") // Move to the next question
        }}
      >
        Neste
      </button>
    </div>
  )
}
