export type Answer = {
  id: string
  title: string
}

export type Question = {
  id: string
  title: string
  type: "radio" | "checkbox"
  answers: Answer[]
}
