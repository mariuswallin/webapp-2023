// Importing the 'NextResponse' object from the 'next/server' module.
import { NextResponse } from "next/server"

// Importing the 'createResponses' and 'faker' functions from a custom module.
import { createResponses, faker } from "@/features/responses/createResponse"

// Define the 'GET' handler for your API route.
export function GET() {
  // Generate an array of responses using the 'createResponses' function with 20 items.
  const responses = createResponses({ faker, count: 20 })

  // Return a JSON response using 'NextResponse.json' with the data and status code.
  return NextResponse.json(
    { data: Array.from(responses.values()) }, // JSON data to send in the response.
    { status: 200 }, // HTTP status code for the response (200 OK in this case).
  )
}
