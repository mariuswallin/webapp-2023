import React from "react"

// An asynchronous function that fetches a question by its ID.
const getQuestion = async (id: string) => {
  try {
    // Send a GET request to the specified API endpoint using the provided ID.
    const response = await fetch(
      `http://localhost:${
        process.env.NEXT_PUBLIC_PORT ?? 3000
      }/api/questions/${id}`,
      {
        method: "get",
      },
    )
    // Parse the response data as JSON and return it.
    const result = await response.json()
    return result
  } catch (error) {
    // If there's an error during the request or JSON parsing, log the error to the console.
    console.error(error)
  }
}

// This is the main component for displaying a single question.
export default async function QuestionPage({
  params,
}: {
  params: { id: string }
}) {
  // Call the 'getQuestion' function to fetch the question based on the 'id' parameter.
  const question = await getQuestion(params.id)

  return (
    // Render the question and its parameters as JSON data.
    <section>
      <p>{JSON.stringify(params)}</p>
      <p>{JSON.stringify(question)}</p>
    </section>
  )
}
