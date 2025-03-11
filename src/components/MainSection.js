import React from "react";
import Post from "./Post";

const MainSection = ({ posts, loading, error, accessToken }) => {
  return (
    <main className="main-section">
      <h2>Top Reddit Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} accessToken={accessToken} />
        ))}
      </ul>
    </main>
  );
};

export default MainSection;
