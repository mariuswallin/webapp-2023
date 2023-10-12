import { type ReactNode } from "react" // Import ReactNode type for type checking

// Importing these dependencies is commented out as they are not used when children are provided.
// import { createResponses, faker } from "../features/responses/createResponse"
// import ResponseItem from "./ResponseItem"

// This component accepts a single prop, `children`, which is of type ReactNode.
// ReactNode is a type that represents any valid React node, which includes JSX, strings, numbers, and more.
export default function Responses({ children }: { children: ReactNode }) {
  // Way to get responses if we do not use children
  // const responses = Array.from(createResponses({ count: 10, faker }).values())
  // const alternative = {
  //   id: "1",
  //   answer: "My answer",
  //   score: 22,
  //   category: "one",
  //   questionId: "123",
  // }
  return (
    <div className="mx-auto mt-4 w-full max-w-4xl">
      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          {/* The {children} prop is used here to render the content passed as children to this component.
          This allows the component to be flexible and render different sets of responses based on where it is used. */}
          {children}
          {/* Alternative way to render responses if children is not used */}
          {/* {responses.map((response) => (
            <ResponseItem key={response.id} {...response} />
          ))} */}
          {/* <ResponseItem id={alternative.id} score={alternative.score} {...alternative} /> */}
          {/* <ResponseItem {...alternative} /> */}
        </table>
      </div>
    </div>
  )
}
