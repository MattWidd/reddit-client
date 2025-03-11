import React, { useState } from "react";
import Login from "./Login";
import Logout from "./Logout";

const Navbar = ({ onSearch, accessToken, setAccessToken  }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && input.trim()) {
      onSearch(input.trim()); // Update the search term in App.js
    }
  };

  return (
    <nav className="navbar">
      <h1>Reddit Client</h1>
      <input
        type="text"
        placeholder="Search Reddit..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSearch} // Trigger on Enter key press
      />
      {!accessToken ?
          <Login setAccessToken={setAccessToken} /> :
        <Logout setAccessToken={setAccessToken} />
        }
    </nav>
  );
};

export default Navbar;
