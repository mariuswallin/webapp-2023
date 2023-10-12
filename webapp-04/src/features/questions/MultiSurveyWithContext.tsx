// Import statements to bring in required modules and components.
import { AnswerProvider } from "./AnswerContext"
import { QuestionProvider } from "./QuestionContext"
import { Stepper } from "./Stepper"
import { SurveyAnswers } from "./SurveyAnswers"
import { SurveyForm } from "./SurveyForm"
import { SurveyQuestion } from "./SurveyQuestion"
import { type Question } from "./types"

// A React functional component named 'MultiSurveyWithContext' that takes two props:
// 'questions' - an array of Question objects, and 'onSubmit' - a callback function for form submission.
export function MultiSurveyWithContext({
  questions,
  onSubmit,
}: {
  questions: Question[]
  onSubmit: (data: Record<string, string | string[]>) => void
}) {
  // Log a message to the console for debugging purposes.
  console.log("Render MultiSurveyWithContext")

  // Define a URL for fetching survey questions (presumably from a local API).
  const url = `http://localhost:${
    process.env.NEXT_PUBLIC_PORT ?? 3000
  }/api/questions`

  // This component's structure is organized using providers and child components:
  return (
    <QuestionProvider url={url} initialQuestions={questions}>
      {/* The AnswerProvider is nested inside the QuestionProvider to provide answers to questions. */}
      {/* The placement of this affects amount of re-renders */}
      <AnswerProvider url={url}>
        {/* The SurveyForm component is the main form container for the survey. */}
        <SurveyForm onSubmit={onSubmit}>
          {/* SurveyQuestion is a component that displays a single survey question. */}
          <SurveyQuestion>
            {/* SurveyAnswers is a component that allows users to provide answers to the question. */}
            <SurveyAnswers />
          </SurveyQuestion>
          {/* Stepper is a component that might be used for navigating through questions. */}
          <Stepper />
        </SurveyForm>
      </AnswerProvider>
    </QuestionProvider>
  )
}
