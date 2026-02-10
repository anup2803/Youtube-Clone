import { createContext, useContext, useEffect, useState } from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";
export const Context = createContext();

export const AppContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchYoutubeData = async (params) => {
    setLoading(true);
    try {
      const response = await fetchApiForYoutubeData("videos", params);
      setVideoData(response?.items || []);
    } catch (error) {
      console.error("error fetching youtube", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYoutubeData({
      part: "snippet,contentDetails,statistics",
      regionCode: "NP",
      chart: "mostPopular",
      maxResults: 100,
      ...(selectedCategory !== "Home" && {
        videoCategoryId: selectedCategory,
      }),
    });
  }, [selectedCategory]);

  return (
    <Context.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        videoData,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};
