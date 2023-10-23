import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h2>Siden finnes ikke</h2>
      <Link href="/" className="underline">
        Tilbake til start
      </Link>
    </div>
  )
}
