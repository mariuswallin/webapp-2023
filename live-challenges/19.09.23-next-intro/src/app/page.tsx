// Import the "Title" component from the "@/components/Title" module.
import Title from "@/components/Title"

// Create and export the "Home" component.
export default function Home() {
  return (
    // Render the main content of the home page.
    <main>
      {/* Render the "Title" component with a title of "First title" and a Tailwind CSS class "bg-red-200". */}
      <Title title="First title" className="bg-red-200" />

      {/* Render another "Title" component with a title of "Second title" without a custom CSS class. */}
      <Title title="Second title" />
    </main>
  )
}
