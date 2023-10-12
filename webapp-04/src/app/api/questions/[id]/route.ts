import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type DummyData = { id: string; question: string }

let data: DummyData[] = [
  { id: "123", question: "q1" },
  { id: "234", question: "q2" },
]

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log(params.id)
  const question = data.find((item) => item.id === params.id)
  return NextResponse.json({ data: { params, question } }, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as DummyData
  console.log(body)
  const questionIndex = data.findIndex((item) => item.id === params.id)
  data = [
    ...data.slice(0, questionIndex),
    { ...data[questionIndex], question: body.question },
    ...data.slice(questionIndex + 1),
  ]
  return NextResponse.json({ data: { params, data, body } }, { status: 200 })
}

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log(params.id)
  data = data.filter((item) => item.id !== params.id)
  return NextResponse.json({ data: { params, data } }, { status: 200 })
}
