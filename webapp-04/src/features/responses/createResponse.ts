// Import necessary types from the "types" module.
import type { CreateResponses, Faker } from "./types"

// Define an array of fake answer options.
const fakeAnswers: string[] = [
  "GlitterGlo Lipstick",
  "QuantumQuench Energy Drink",
  "StellarScent Perfume",
  "PurrfectPillow Pet Bed",
]

// Define an array of fake scores.
const fakeScores: number[] = [3, 2, 1]

// Define an array of fake categories.
const fakeCategories: string[] = ["Math", "Code", "Science"]

// Define a function to get a random item from an array.
const getRandomItem = <T>(items: T[]) => {
  // Generate a random index within the array's length.
  const randomIndex = Math.floor(Math.random() * items.length)

  // Return the random item from the array.
  return items[randomIndex]
}

// Define a function to generate a random ID.
const getRandomId = () => {
  // Generate a random decimal number, convert it to base 36, and remove the leading "0.".
  return Math.random().toString(36).slice(2)
}

// Export a "faker" object that provides fake data generation methods.
export const faker: Faker = {
  // Generate a random ID using the getRandomId function.
  id: () => getRandomId(),

  // Get a random answer option from the fakeAnswers array.
  answer: () => getRandomItem(fakeAnswers),

  // Get a random score from the fakeScores array.
  score: () => getRandomItem(fakeScores),

  // Get a random category from the fakeCategories array.
  category: () => getRandomItem(fakeCategories),
}

// Define a function to create responses.
const createResponses: CreateResponses = ({
  existingResponses,
  count,
  faker,
}) => {
  // Create a new Map to store responses, initializing it with existing responses.
  const responses = new Map(existingResponses)

  // Check if there are no existing responses and the requested count is zero.
  if (responses.size === 0 && count === 0) {
    // If both conditions are met, throw an error to indicate no response added.
    throw new Error("No response added")
  }

  // Generate "count" number of fake responses and add them to the map.
  for (let i = 0; i < count; i++) {
    // Generate a unique ID for each response using the faker's id method.
    const response = {
      id: faker.id(),
      questionId: "1", // Hardcoded question ID for simplicity.
      score: faker.score(), // Get a random score.
      category: faker.category(), // Get a random category.
      answer: faker.answer(), // Get a random answer option.
    }

    // Set a unique key for each response in the map (e.g., "response-0", "response-1").
    responses.set(`response-${i}`, response)
  }

  // Return the map of responses.
  return responses
}

// Export the "createResponses" function and the "getRandomId" function.
export { createResponses, getRandomId }
