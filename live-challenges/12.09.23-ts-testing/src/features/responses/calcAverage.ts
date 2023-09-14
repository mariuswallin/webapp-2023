// Import the Response type from the "types" module.
import { type Response } from "./types"

// Define a type "CalcAvaerageByCategory" which represents an object mapping categories
// to their respective average score information. It can also be undefined if there are no responses.
type CalcAvaerageByCategory =
  | Record<
      Response["category"],
      { sum: number; average: number; count: number }
    >
  | undefined

// Define a function to calculate the average score by category.
export const calcAverageScore = (responses: Map<string, Response>) => {
  // Convert the responses Map into an array of response objects.
  const responseList = Array.from(responses.values())

  // Use the "reduce" function to calculate the average score by category.
  return responseList.reduce<CalcAvaerageByCategory>((agg, response) => {
    // Get the category from the current response.
    const category = response.category

    if (agg?.[category]) {
      // If the category exists in the aggregation, update its values.
      const { sum, count } = agg[category]
      agg[category] = {
        count: count + 1, // Increment the count of responses in this category.
        sum: sum + response.score, // Add the current response's score to the sum.
        average: (sum + response.score) / (count + 1), // Calculate the new average.
      }
    } else {
      // If the category does not exist in the aggregation, create it.
      agg = {
        ...(agg ?? {}), // Initialize with an empty object if undefined.
        [category]: {
          count: 1, // Initialize the count to 1 for the first response.
          average: response.score, // Initialize the average with the current response's score.
          sum: response.score, // Initialize the sum with the current response's score.
        },
      }
    }
    return agg
  }, {})
}

// Define a type "CalcAverageScoreByKey" which represents average score information
// grouped by a specified key. It includes the sum, average, count, groupKey (the key used for grouping),
// and groupValue (the value of the group).
type CalcAverageScoreByKey = {
  sum: number
  average: number
  count: number
  groupKey: keyof Pick<Response, "category" | "questionId" | "score">
  groupValue: string | number
}

// Define a type "CalcAverageByKeyResult" which represents an object mapping group values
// to their respective average score information. It can also be undefined if there are no responses.
type CalcAverageByKeyResult = Record<string, CalcAverageScoreByKey> | undefined

// Define a function to calculate the average score by a specified key (e.g., category, questionId, score).
export const calcAverageScoreByKey = (
  responses: Map<string, Response>,
  key: keyof Pick<Response, "category" | "questionId" | "score">,
): CalcAverageByKeyResult | Record<string, never> => {
  // Convert the responses Map into an array of response objects.
  const responseList = Array.from(responses.values())

  // Use the "reduce" function to calculate the average score by the specified key.
  return responseList.reduce<CalcAverageByKeyResult>((agg, response) => {
    // Get the group value for the current response based on the specified key.
    const groupValue = response[key]

    // Extract the sum and count from the aggregation for the current group value, or initialize them to 0.
    const { sum = 0, count = 0 } = agg?.[groupValue] ?? {}

    return {
      ...agg,
      [groupValue.toString()]: {
        groupKey: key, // Specify the key used for grouping.
        groupValue, // Specify the group value.
        count: count + 1, // Increment the count of responses in this group.
        sum: sum + response.score, // Add the current response's score to the sum.
        average: (sum + response.score) / (count + 1), // Calculate the new average.
      },
    }
  }, {})
}
