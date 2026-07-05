import React from "react";
import Home from "./Home";
import Login from "./Login"; // नई Login फ़ाइल को इम्पोर्ट किया

function Varification({ user, setUser }) {
  return (
    <>
      <div className="rounded-lg  w-full ">
        {user ? (
          <div className="text-center">
            <Home />
          </div>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default Varification;