"use client"

// Needed in Next 13 to be able to use hooks like useState
import { useState } from "react" // Import the useState hook from React

import ResponseItem from "@/components/ResponseItem" // Import a custom ResponseItem component
import Responses from "@/components/Responses" // Import a custom Responses component
import { createResponses, faker } from "@/features/responses/createResponse" // Import functions for generating responses

export default function ResponsePage() {
  const [responses, setResponses] = useState(
    Array.from(createResponses({ count: 10, faker }).values()), // Initialize the responses state with 10 generated responses
  )

  const deleteResponseItemHandler = (id: string) => {
    // Alternative way to handle filtering
    // const filteredContent = responses.filter((response) => response.id !== id)
    // setResponses(filteredContent)
    // Handle deletion of a response by filtering the responses array
    // prev in this case is the previous state
    setResponses((prev) => prev.filter((response) => response.id !== id))
  }

  if (!responses.length) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <p>Ingen responser</p>{" "}
        {/* Display a message if there are no responses */}
      </div>
    )
  }

  return (
    <Responses>
      {responses.map((response) => (
        <ResponseItem
          key={response.id} // Assign a unique key to each ResponseItem for efficient rendering
          {...response} // Pass response data as props to ResponseItem
          onDelete={deleteResponseItemHandler} // Provide a delete handler function as a prop
        />
      ))}
    </Responses>
  )
}
