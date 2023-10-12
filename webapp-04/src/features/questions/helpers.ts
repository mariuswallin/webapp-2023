// An asynchronous function to fetch questions from a specified URL.
export const getQuestions = async (url: string) => {
  try {
    // Send a GET request to the provided URL to retrieve data.
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    })
    // Parse the response data as JSON and return it.
    const result = await response.json()
    return result
  } catch (error) {
    // If there's an error during the request or JSON parsing, return the error as a JSON string.
    return JSON.stringify(error)
  }
}

// An asynchronous function to send a survey response to a specified URL.
export const createSurveyResponse = async (
  url: string,
  body: Record<string, string | string[]>,
) => {
  try {
    // Send a POST request to the provided URL with a JSON-serialized 'body' and appropriate headers.
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // Parse the response data as JSON and return it.
    const result = await response.json()
    return result
  } catch (error) {
    // If there's an error during the request or JSON parsing, return the error as a JSON string.
    return JSON.stringify(error)
  }
}

// A function named 'Survey' that returns an object with 'get' and 'post' methods.
// Url could be left out and hardcoded
export const Survey = (url: string) => {
  return {
    // 'get' method is used to fetch questions from the specified URL using the 'getQuestions' function.
    get: () => getQuestions(url),

    // 'post' method is used to send a survey response to the specified URL using the 'createSurveyResponse' function.
    // It takes a 'body' parameter that represents the data to be sent.
    post: (body: Record<string, string | string[]>) =>
      createSurveyResponse(url, body),
  }
}
