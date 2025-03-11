import React, { useState } from 'react';

// Replace with your actual client ID and redirect URI from your Reddit app
const CLIENT_ID = 'JqbC0Rpl4nZ5hTpZOCft7A'; // Example: 'myapp123'
const REDIRECT_URI = 'http://localhost:3000'; // Replace with your actual redirect URL

const Login = ({ setAccessToken }) => {
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem("oauthState", state); // Store state for validation
  
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=permanent&scope=read,identity`;
  
    window.location.href = authUrl;
  };
  

  return (
    <div className="login">
      <button onClick={handleLogin}>Login with Reddit</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
