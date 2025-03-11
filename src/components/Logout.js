import React from "react";

// Logout Component
const Logout = ({ setAccessToken }) => {
  const handleLogout = () => {
    // Clear the access token from localStorage
    localStorage.removeItem("accessToken");
    // Update the accessToken state in App.js
    setAccessToken(null);
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
