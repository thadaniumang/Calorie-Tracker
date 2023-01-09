// React and NextJS
import Router from "next/router"

// Supabase
import supabase from "../supabase"


export default function Account() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    return Router.push("/auth/login");
  }

  return (
    <div>
      <h2>This is gonna be a Dashboard</h2>

      <div>
        <button className="button block" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  )
}