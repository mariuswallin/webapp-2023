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
    <div className="relative mx-auto mt-4 max-w-2xl overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Answere
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
          </tr>
        </thead>
        <tbody>
          {/* The {children} prop is used here to render the content passed as children to this component.
          This allows the component to be flexible and render different sets of responses based on where it is used. */}
          {children}
          {/* Alternative way to render responses if children is not used */}
          {/* {responses.map((response) => (
            <ResponseItem key={response.id} {...response} />
          ))} */}
          {/* <ResponseItem id={alternative.id} score={alternative.score} {...alternative} /> */}
          {/* <ResponseItem {...alternative} /> */}
        </tbody>
      </table>
    </div>
  )
}
