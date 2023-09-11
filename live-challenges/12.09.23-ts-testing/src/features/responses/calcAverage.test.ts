import { calcAverageScore, calcAverageScoreByKey } from "./calcAverage"
import { Response } from "./types"

describe.only("Calculate averages", () => {
  it("should calculate average by category", () => {
    const responses = new Map<string, Response>([
      [
        "response-1",
        {
          id: "response-1",
          score: 2,
          category: "one",
          answer: "answer",
          questionId: "2",
        },
      ],
      [
        "response-2",
        {
          id: "response-initial",
          score: 3,
          category: "one",
          answer: "answer",
          questionId: "2",
        },
      ],
      [
        "response-3",
        {
          id: "response-initial",
          score: 2,
          category: "two",
          answer: "answer",
          questionId: "1",
        },
      ],
    ])
    const averages = calcAverageScore(responses)
    expect(averages["one"].sum).toBe(5)
    expect(averages["one"].count).toBe(2)
    expect(averages["one"].average).toBe(2.5)
  })
  it("should calculate average by questionId", () => {
    const responses = new Map<string, Response>([
      [
        "response-1",
        {
          id: "response-1",
          score: 2,
          category: "one",
          answer: "answer one",
          questionId: "2",
        },
      ],
      [
        "response-2",
        {
          id: "response-initial",
          score: 3,
          category: "one",
          answer: "answer two",
          questionId: "1",
        },
      ],
      [
        "response-3",
        {
          id: "response-initial",
          score: 2,
          category: "two",
          answer: "answer tree",
          questionId: "2",
        },
      ],
    ])

    const averagesByQuestionId = calcAverageScoreByKey(responses, "questionId")
    const averagesByScore = calcAverageScoreByKey(responses, "score")
    const averagesByCategory = calcAverageScoreByKey(responses, "category")

    // By questionId
    expect(averagesByQuestionId["1"].sum).toBe(3)
    expect(averagesByQuestionId["1"].count).toBe(1)
    expect(averagesByQuestionId["1"].average).toBe(3)
    expect(averagesByQuestionId["1"].groupKey).toBe("questionId")
    expect(averagesByQuestionId["1"].groupValue).toBe("1")
    expect(averagesByQuestionId["2"].sum).toBe(4)
    expect(averagesByQuestionId["2"].count).toBe(2)
    expect(averagesByQuestionId["2"].average).toBe(2)

    // By score
    expect(averagesByScore[2].sum).toBe(4)
    expect(averagesByScore[2].count).toBe(2)
    expect(averagesByScore[2].average).toBe(2)
    expect(averagesByScore[2].groupKey).toBe("score")
    expect(averagesByScore[2].groupValue).toBe(2)

    // By category
    expect(averagesByCategory["two"].sum).toBe(2)
    expect(averagesByCategory["two"].count).toBe(1)
    expect(averagesByCategory["two"].average).toBe(2)
    expect(averagesByCategory["two"].groupKey).toBe("category")
    expect(averagesByCategory["two"].groupValue).toBe("two")
  })
})
