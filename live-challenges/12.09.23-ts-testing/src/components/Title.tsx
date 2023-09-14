// Define a type "TitleProps" to specify the expected props for the "Title" component.
type TitleProps = {
  title: string // A required prop: the title to be displayed.
  className?: string // An optional prop: additional CSS class for styling.
}

// Create and export the "Title" component.
export default function Title(props: TitleProps) {
  // Destructure the "title" and "className" props from the "props" object.
  const { title, className } = props

  // Render an <h1> element with the specified title and optional class.
  return <h1 className={className}>{title}</h1>
}
