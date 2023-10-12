import { useState } from "react"

import { type Question } from "./types"

export const useQuestion = (questions: Question[]) => {
  const [current, setCurrent] = useState(0)
  // Get the current question based on the 'current' index
  const currentQuestion = questions[current]
  const isFinalQuestion = current === questions.length - 1

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
  return {
    handleStep,
    currentQuestion,
    isFinalQuestion,
  }
}
