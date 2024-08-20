import React, { useState } from "react";
import { auth } from './data/Aut';
import Home from "./Home";
import { Button } from "./ui/button";
// import Welcome from "./Veri";
function Varification() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Find the user in the auth array
    const foundUser = auth.find(
      (u) => u.Username === username && u.Email === email && u.Password === password
    );
    if (foundUser) {
      setUser(foundUser); // Log the user in
    } else {
      alert("Invalid credentials or user not found.");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <Welcome/> */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {user ? (
          <div className="text-center">
            {/* <h1 className="text-2xl font-semibold mb-4">Welcome, {user.Username}!</h1> */}
            <Home />
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleLogin} className="w-full"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Varification;
