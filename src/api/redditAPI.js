const BASE_URL = 'https://www.reddit.com';

export const fetchPosts = async (query) => {
  const url =
    query === "popular"
      ? `${BASE_URL}/r/popular.json`
      : `${BASE_URL}/search.json?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const json = await response.json();

    return json.data.children.map((post) => post.data);
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err; // Re-throw the error for further handling
  }
};
