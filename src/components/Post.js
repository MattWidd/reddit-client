import React, { useState } from "react";

const Post = ({ post, accessToken }) => {
  const [userVote, setUserVote] = useState(0);

  const handleVote = async (vote) => {
    if (!accessToken) {
      return; // If the user is not logged in, prevent voting
    }

    if (userVote === vote) {
      setUserVote(0); // Clicking again removes the vote
    } else {
      setUserVote(vote);
    }

    // Send vote to Reddit here
    await submitVote(post.id, vote);
  };

  const submitVote = async (postId, vote) => {
    const url = `https://oauth.reddit.com/api/vote`;
    const headers = {
      Authorization: `bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      id: `t3_${postId}`,
      dir: vote, // 1 for upvote, -1 for downvote, 0 to remove vote
    });

    try {
      await fetch(url, {
        method: "POST",
        headers,
        body,
      });
    } catch (err) {
      console.error("Error submitting vote:", err);
    }
  };

  const postVotes = post.score + userVote;

  return (
    <li className="post">
      <h3>{post.title}</h3>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Score:</strong> {postVotes}</p>

      {/* Upvote and Downvote Buttons */}
      {accessToken && (
        <div className="vote-buttons">
          <button onClick={() => handleVote(1)} className={userVote === 1 ? "active" : ""}>
            🔼 Upvote
          </button>
          <button onClick={() => handleVote(-1)} className={userVote === -1 ? "active" : ""}>
            🔽 Downvote
          </button>
        </div>
      )}

      {/* Post media */}
      {post.preview?.images?.[0]?.source?.url && (
        <img src={post.preview.images[0].source.url} alt="Post preview" className="post-image" />
      )}

      {post.url?.match(/\.(jpeg|jpg|gif|png)$/) && (
        <img src={post.url} alt="Post media" className="post-image" />
      )}

      {/* Reddit Video */}
      {post.media?.reddit_video && (
        <video controls className="post-video">
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
        View on Reddit
      </a>
    </li>
  );
};

export default Post;
