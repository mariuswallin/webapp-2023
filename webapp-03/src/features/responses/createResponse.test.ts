import { createResponses, getRandomId } from "./createResponse"
import { Faker, Response } from "./types"

const fakerMock: Faker = {
  id: getRandomId,
  answer: () => "answer",
  score: () => 2,
  category: () => "one",
}

describe.only("Create responses", () => {
  it("should create responses", () => {
    const responses = createResponses({ count: 10, faker: fakerMock })
    expect(responses.size).toBe(10)
  })
  it("should have correct data", () => {
    const responses = createResponses({ count: 10, faker: fakerMock })
    const firstResponse = Array.from(responses.values())[0]

    expect(firstResponse.answer).toBe("answer")
    expect(firstResponse.score).toBe(2)
    expect(firstResponse.category).toBe("one")
  })
  it("should add to existing list", () => {
    const initalResponses = new Map<string, Response>([
      [
        "response-initial",
        {
          id: "response-initial",
          score: 25,
          category: "Initial",
          answer: "answer",
          questionId: "1",
        },
      ],
    ])
    const responses = createResponses({
      existingResponses: initalResponses,
      count: 10,
      faker: fakerMock,
    })

    expect(responses.size).toBe(11)
  })
  it("should fail if no response can be added", () => {
    expect(() =>
      createResponses({
        count: 0,
        faker: fakerMock,
      }),
    ).toThrowError("No response added")
  })
})
