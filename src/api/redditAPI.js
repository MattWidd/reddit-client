const BASE_URL = 'https://www.reddit.com';

export const fetchPosts = async (subreddit = 'popular') => {
  const response = await fetch(`${BASE_URL}/r/${subreddit}.json`);
  const json = await response.json();
  return json.data.children.map((post) => post.data);
};
