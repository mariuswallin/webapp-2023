"use client"

import { Survey } from "./helpers"
import { MultiSurveyWithContext } from "./MultiSurveyWithContext"
import { type Question } from "./types"

export default function Questions({ questions }: { questions: Question[] }) {
  async function onSubmit(data: Record<string, string | string[]>) {
    console.log(data)
    await Survey(
      `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}/api/questions`,
    ).post(data)
  }

  return (
    <section className="mx-auto mt-10 max-w-lg">
      <h1 className="text-2xl font-bold">Oppgaver</h1>
      {/* <MultiSurvey onSubmit={onSubmit} questions={questions} /> */}
      <MultiSurveyWithContext onSubmit={onSubmit} questions={questions} />
    </section>
  )
}
