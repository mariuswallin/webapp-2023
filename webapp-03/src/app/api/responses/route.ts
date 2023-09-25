import { NextResponse } from "next/server"

import { createResponses, faker } from "@/features/responses/createResponse"

export function GET() {
  const responses = createResponses({ faker, count: 20 })
  return NextResponse.json(
    { data: Array.from(responses.values()) },
    { status: 200 },
  )
}
