import React from 'react'
import {Button} from './components/ui/button'
import Navbar from './components/Navbar'
import Varification from './components/Welcome'
import About from './components/About'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './components/User'

function App() {
  
  const router = createBrowserRouter([
    {path:'/',
      element:<><Navbar/><Varification/></>,
    },
    {path:'About',
      element:<><Navbar/><About/></>
    },
    {path:'/user/:User',
      element:<><Navbar/><User/></>
    },
    // {path:'/Login',
      // element:<><Navbar/><Login/></>
    // },
    {path:'/Signup',
      element:<><Navbar/><Signup/></>
    }
    // {path:/}
  ])
  return (
    <>
    <div className="bg-zinc-950 dark:bg-white" />
{/* <Varification/> */}
    <RouterProvider router={router} />
    </>
  )
}
export default App



