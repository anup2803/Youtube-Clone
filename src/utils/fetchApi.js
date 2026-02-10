import axios from "axios";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchApiForYoutubeData = async (endpoints, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    ("YouTube API error:", error.response?.data || error.message);
    return null;
  }
};
