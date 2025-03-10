import React from "react";

const MainSection = ({ posts, loading, error }) => {
  return (
    <main className="main-section">
      <h2>Top Reddit Posts</h2>
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
    </main>
  );
};

export default MainSection;
