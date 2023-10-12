import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const data = [
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
