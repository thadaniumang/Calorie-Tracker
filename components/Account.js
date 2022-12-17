// React and NextJS
import Router from "next/router"

// Supabase
import supabase from "../supabase"

// Recoil
import { useRecoilState } from "recoil"
import { loggedInState, userState } from "../atoms"


export default function Account() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const [user, setUser] = useRecoilState(userState)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setUser(null);
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