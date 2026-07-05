import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"

function Navbar({ user, setUser }) {
  
  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="m-0 w-full bg-pink-500 p-0">
      <nav className="m-0 h-11 max-w-7xl mx-auto flex justify-end items-center text-xl p-0">
        {user ? (
          <Button
            onClick={handleLogout}
            className="h-7 mr-7 bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Logout
          </Button>
        ) : (
          <>
            <NavLink to="/"> 
              <Button className="h-7 mr-7 bg-white text-pink-600 hover:bg-pink-50 font-medium transition-colors border border-pink-200">Login</Button>
            </NavLink>
            <NavLink to="/signup">
              <Button className="h-7 mr-7 bg-red-500 text-white hover:bg-red-600 font-medium transition-colors">SignUp</Button>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar