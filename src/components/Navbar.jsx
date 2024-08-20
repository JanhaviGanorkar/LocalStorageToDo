import React from "react"
import { Link, NavLink } from "react-router-dom"
import { Button } from "./ui/button"
function Navbar(){
    return(
        <div className="m-0 w-full bg-pink-300 p-0">
        <nav className="m-0 h-11 max-w-7xl mx-auto flex justify-end items-center text-xl p-0">
            {/* <NavLink className={(e)=>{return e.isActive?"text-gray-500": ""}} to="/"><li className="list-none text-xl mr-7">Home</li></NavLink> */}
            <NavLink className={(e)=>{return e.isActive?"text-gray-500": ""}}  to="/"><li className="list-none mr-6">Welcome</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"text-gray-500": ""}}  to="/about"><li className="list-none mr-6">About</li></NavLink>
            <NavLink  to="/"> <Button className="h-7 mr-7">Login</Button></NavLink>
            <NavLink to="/signup"><Button className="h-7 mr-7">SignUp</Button></NavLink>
        </nav>
        </div>
    )
}
export default Navbar