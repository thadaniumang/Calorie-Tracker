// React and NextJS
import Router from "next/router"
import Link from "next/link";

// Supabase
import supabase from "../supabase"


export default function Navbar() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    return Router.push("/auth/login");
  }

  return (
    <nav className="flex justify-center md:justify-end">
      <Link href="/search" className="rounded-lg px-3 py-1 bg-purple-600 text-white hover:bg-white hover:border border-purple-600 hover:text-purple-600 mx-3">Add Item</Link>
      <button className="px-3 py-1 mx-3 rounded-lg border border-gray-600 hover:opacity-50" onClick={handleLogout}>Sign Out</button>
    </nav>
  )
}