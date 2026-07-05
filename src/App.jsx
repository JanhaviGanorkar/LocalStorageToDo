import React, { useState } from 'react' // 1. useState इम्पोर्ट किया
import { Button } from './components/ui/button'
import Navbar from './components/Navbar'
import Varification from './components/Welcome'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './components/User'

function App() {
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("loggedInUser");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar user={user} setUser={setUser} />
          <Varification user={user} setUser={setUser} />
        </>
      ),
    },
    {
      path: '/user/:User',
      element: (
        <>
          <Navbar user={user} setUser={setUser} />
          <User />
        </>
      )
    },
    {
      path: '/Signup',
      element: (
        <>
          <Navbar user={user} setUser={setUser} />
          <Signup />
        </>
      )
    }
  ])

  return (
    <>
      <div className="bg-zinc-950 dark:bg-white" />
      <RouterProvider router={router} />
    </>
  )
}

export default App