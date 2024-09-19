import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getSuggestions = async (query) => {
  try {
    const response = await api.get(
      `/suggestions?query=${encodeURIComponent(query)}`
    );
    return response.data.suggestions;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};

export const getHashtagSuggestions = async (title) => {
  try {
    const response = await api.get(
      `/hashtag-suggestions?title=${encodeURIComponent(title)}`
    );
    return response.data.hashtags;
  } catch (error) {
    console.error("Error generating hashtag suggestions:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
    throw error; // Re-throw the error so it can be handled in the component
  }
};
