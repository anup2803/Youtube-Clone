import axios from "axios";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBxeS5AcEcXo2MczkPamlTTyk0FYg0R7dI";

export const fetchApiForYoutubeData = async (endpoints, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });
    console.log("this is my response", response.data);
    return response.data;
  } catch (error) {
    ("YouTube API error:", error.response?.data || error.message);
    return null;
  }
};
