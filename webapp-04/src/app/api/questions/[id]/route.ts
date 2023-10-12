import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

type DummyData = { id: string; challenge: number }

let data: DummyData[] = [
  { id: "123", challenge: 1 },
  { id: "234", challenge: 2 },
]

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log(params.id)
  const challenge = data.find((item) => item.id === params.id)
  return NextResponse.json({ data: { params, challenge } }, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as DummyData
  console.log(body)
  const challengeIndex = data.findIndex((item) => item.id === params.id)
  data = [
    ...data.slice(0, challengeIndex),
    { ...data[challengeIndex], challenge: body.challenge },
    ...data.slice(challengeIndex + 1),
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
