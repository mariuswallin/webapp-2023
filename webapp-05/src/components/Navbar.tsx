"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    label: "Hjem",
    href: "/",
  },
  {
    label: "Produkter",
    href: "/products",
  },
]

export default function Navbar() {
  const pathname = usePathname()

  const checkActivePath = (path: string) => {
    return path === pathname
  }

  return (
    <nav className="mb-6 flex gap-2">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={checkActivePath(item.href) ? "underline" : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
