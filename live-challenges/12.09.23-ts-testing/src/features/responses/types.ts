export type Response = {
  id: string
  answer: string
  score: number
  category: string
  questionId: string
}

export type Faker = {
  id: () => string
  score: () => number
  category: () => string
  answer: () => string
}

export type CreateResponseParams = {
  existingResponses?: Map<string, Response>
  count: number
  faker: Faker
}

export type CreateResponses = (
  params: CreateResponseParams,
) => Map<string, Response>
