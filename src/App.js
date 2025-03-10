import { useEffect, useState } from "react";
import { fetchPosts } from "./api/redditAPI";
import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts("popular");
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <MainSection posts={posts} loading={loading} error={error} />
    </div>
  );
}

export default App;
