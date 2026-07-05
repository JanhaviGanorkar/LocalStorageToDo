import { auth } from '../components/data/Aut';

export const handleLogin = (username, email, password, setUser) => {
  const foundUser = auth.find(
    (u) => u.Username === username && u.Email === email && u.Password === password
  );

  if (foundUser) {
    setUser(foundUser); 
    // 💾 यूजर का डेटा localStorage में सेव कर दिया (String बनाकर)
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    alert("Login Successful!");
    return true;
  } else {
    alert("Invalid credentials or user not found.");
    return false;
  }
};

export const handleLogout = (setUser) => {
  setUser(null); 
  // 🗑️ localStorage से यूजर का डेटा डिलीट कर दिया
  localStorage.removeItem("loggedInUser");
};