// React and NextJS
import Link from "next/link";


// Component
export default function Navbar() {
  return (
    <nav className="flex justify-center md:justify-end">
      <Link href="/goals" className="rounded-lg px-3 py-1 bg-purple-600 text-white hover:bg-white hover:border border-purple-600 hover:text-purple-600 mx-3">Modify Goals</Link>
      <Link href="/search" className="rounded-lg px-3 py-1 bg-purple-600 text-white hover:bg-white hover:border border-purple-600 hover:text-purple-600 mx-3">Add Item</Link>
    </nav>
  )
}