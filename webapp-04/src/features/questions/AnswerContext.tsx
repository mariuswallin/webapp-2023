import { createContext, useContext, useState } from "react"
import type { ChangeEvent, ReactNode } from "react"

import { Survey } from "./helpers"
import { useAnswer } from "./useAnswer"

type Status = "idle" | "error" | "success" | "loading"

type AnswerContextType = {
  handleSelect: (e: ChangeEvent<HTMLInputElement>) => void
  responses: Record<string, string | string[]>
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  status: Status
}

const AnswerContext = createContext<AnswerContextType | undefined>(undefined)

export const AnswerProvider = (props: { children: ReactNode; url: string }) => {
  const { children, url } = props
  const [status, setStatus] = useState<Status>("idle")
  const isLoading = status === "loading"
  const isError = status === "error"
  const isSuccess = status === "success"

  const { handleSelect, responses } = useAnswer()

  const postResponses = async (body: Record<string, string>) => {
    try {
      setStatus("loading")
      await Survey(url).post(body)
      setStatus("success")
    } catch (error) {
      setStatus("error")
    } finally {
      setTimeout(() => {
        setStatus("idle")
      }, 2000)
    }
  }

  const value = {
    postResponses,
    handleSelect,
    responses,
    isLoading,
    isError,
    isSuccess,
    status,
  }

  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  )
}

export const useAnswerContext = () => {
  const context = useContext(AnswerContext)
  if (!context) {
    throw new Error("AnswerContext needs a AnswerProvider")
  }
  return context
}
