import React, { useEffect, useState } from "react";
import { fetchPosts } from "./api/redditAPI";
import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Logout from "./components/Logout";
import './App.css';

const CLIENT_ID = 'JqbC0Rpl4nZ5hTpZOCft7A';
const CLIENT_SECRET = 'Rz8up5zqA-5GczIAH9GkuRga9avmeg';
const REDIRECT_URI = 'http://localhost:3000';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("popular");
  const [accessToken, setAccessToken] = useState(null); // Track the accessToken state

  // Fetch the access token after Reddit redirects back
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState = params.get("state");
    const storedState = localStorage.getItem("oauthState");

    if (returnedState && returnedState !== storedState) {
      console.error("OAuth state mismatch. Possible CSRF attack.");
      return;
    }

    if (code && !accessToken) {
      fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setAccessToken(data.access_token);
          window.history.replaceState({}, document.title, "/"); // Clean URL
        }
      })
      .catch(err => console.error("Error fetching access token:", err));
    }
  }, [accessToken]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts(searchTerm);
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [searchTerm]);

  return (
    <div className="app">
      <Navbar onSearch={setSearchTerm}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
      />
      <MainSection
          posts={posts}
          loading={loading}
          error={error}
          accessToken={accessToken}
        />
    </div>
  );
}

export default App;
