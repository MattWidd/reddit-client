import { useEffect, useState } from "react";
import { fetchPosts } from "./api/redditAPI";

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
    <div>
      <h1>Reddit Client</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
