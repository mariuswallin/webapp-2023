export type Response = {
  id: string
  answer: string
  score: number
  category: string
  questionId: string
}

// How the Response object will look like
// const response: Response = {
//   id: "1",
//   answer: "1",
//   score: 1,
//   category: "1",
//   questionId: "1",
// }

export type Faker = {
  id: () => string
  score: () => number
  category: () => string
  answer: () => string
}

// How the Faker type will look like
// const faker: Faker = {
//   id: () => "",
//   score: () => 1,
//   category: () => "",
//   answer: () => "",
// }

export type CreateResponseParams = {
  existingResponses?: Map<string, Response>
  count: number
  faker: Faker
}

// const faker: Faker = {
//   id: () => "",
//   score: () => 1,
//   category: () => "",
//   answer: () => "",
// }

// const response: Response = {
//   id: "1",
//   answer: "1",
//   score: 1,
//   category: "1",
//   questionId: "1",
// }

// const existingResponses = new Map<string, Response>([["response-id", response]])

// How the CreateResponseParams will be used
// const createResponseParams: CreateResponseParams = {
//   existingResponses,
//   count: 10,
//   faker,
// }

export type CreateResponses = (
  params: CreateResponseParams,
) => Map<string, Response>
