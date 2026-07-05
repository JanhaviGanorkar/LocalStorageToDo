import React, { useState } from "react";
import { Button } from "./ui/button";
import { handleLogin } from "../lib/helper"; 

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500 opacity-30 blur-[100px] animate-[bounce_6s_infinite_alternate] z-0 pointer-events-none"></div>

      <div className="w-full max-w-lg p-8 border border-white/20 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
        
        <div className="space-y-5 flex flex-col">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 pl-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 pl-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 pl-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-base bg-white/90"
            />
          </div>

          <Button
            onClick={() => handleLogin(username, email, password, setUser)}
            className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg rounded-xl transition-colors mt-4 shadow-sm"
          >
            Login
          </Button>
        </div>
      </div>

    </div>
  );
}

export default Login;