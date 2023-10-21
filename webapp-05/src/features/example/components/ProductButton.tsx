"use client"

export default function ProductButton() {
  const handleClick = () => {
    //onClick(product)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-3 rounded bg-blue-600 px-3 py-1 text-sm text-white"
    >
      Add to cart
    </button>
  )
}
