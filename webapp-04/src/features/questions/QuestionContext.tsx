// Import necessary modules and types.
import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react" // This imports the 'ReactNode' type.

// Import modules, types, and custom hooks from other parts of your application.
import { Survey } from "./helpers"
import { type Question } from "./types" // Import the 'Question' type.
import { useQuestion } from "./useQuestion" // Custom hook for managing questions and navigation.

// Define the type for the QuestionContext.
type QuestionContextType = {
  questions: Question[] | null
  currentQuestion: Question
  stepper: (action: "prev" | "next") => void
  getQuestions: (url: string, filter: string | null) => void
  isFinalQuestion: boolean
}

// Create a context for managing questions and their state.
const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined,
)

// A React component called 'QuestionProvider' responsible for providing question-related data and functionality to its children.
export const QuestionProvider = (props: {
  children: ReactNode
  url: string // The URL for fetching questions (not really needed)
  initialQuestions?: Question[] // An optional initial set of questions.
}) => {
  // Destructure the properties from the 'props' object.
  const { children, url, initialQuestions } = props

  // Use 'useState' to manage the 'questions' state, initializing it with 'initialQuestions' or an empty array if not provided.
  const [questions, setQuestions] = useState(initialQuestions ?? [])

  // Use a custom hook 'useQuestion' to manage the current question and navigation.
  const { handleStep, currentQuestion, isFinalQuestion } =
    useQuestion(questions)

  // An asynchronous function to fetch questions from the provided URL.
  const getQuestions = async () => {
    const result = (await Survey(url).get()) as Question[]
    setQuestions(result)
  }

  // Create the 'value' object with the properties to be provided via the context.
  const value = {
    getQuestions,
    stepper: handleStep, // Remap handleStep to stepper
    currentQuestion,
    questions,
    isFinalQuestion,
  }

  // Provide the 'value' object via the 'QuestionContext.Provider' to its children components.
  // Meaning we can use all the values in all child-components where the QuestionProvider is used
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  )
}

// A custom hook called 'useQuestionContext' for accessing the QuestionContext.
// In components that has a QuestionProvider we can use const {deconstructedValues} = useQuestionContext()
export const useQuestionContext = () => {
  const context = useContext(QuestionContext)
  if (!context) {
    throw new Error("QuestionContext needs a QuestionProvider")
  }
  return context
}
