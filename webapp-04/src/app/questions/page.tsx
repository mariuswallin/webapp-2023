// Import statements for necessary modules and components
import { Survey } from "@/features/questions/helpers" // Importing the Survey helper from a specific module
import Questions from "@/features/questions/Questions" // Importing the Questions component
import { type Question } from "@/features/questions/types" // Importing the Question type from a specific module

// This is the main function that represents a web page, and it's marked as asynchronous with 'async'.
export default async function QuestionsPage() {
  // Use the 'await' keyword to fetch data from a remote server (an API) at this URL.
  // This URL appears to be a local development server since it's using 'http://localhost:3000'.
  console.log(process.env.NEXT_PUBLIC_PORT)
  const questions = (await Survey(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}/api/questions`,
  ).get()) as Question[]

  // The fetched data is expected to be an array of 'Question' objects.
  // It's cast as 'Question[]' to provide type information to the variable 'questions'.

  // Finally, return the 'Questions' component with the fetched 'questions' data as a prop.
  return <Questions questions={questions} />
}
