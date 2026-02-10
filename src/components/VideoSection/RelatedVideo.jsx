import React, { useEffect, useState } from "react";
import { useTheme } from "../../useContextHook/useTheme";
import { useAppContext } from "../../useContextHook/useContextApi";
import axios from "axios";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";
import { data, Link } from "react-router-dom";
import { formatDuration } from "date-fns";
import { formatPublishTime, formatViewCount } from "../../utils/helper";

const RelatedVideo = ({ categoryId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { isDarkMode } = useTheme();
  const { setLoading } = useAppContext();

  const fetchRelatedVideos = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("videos", {
        part: "snippet,contentDetails,statistics",
        regionCode: "NP",
        chart: "mostPopular",
        videoCategoryId: categoryId,
        maxResults: 20,
      });
      setRelatedVideos(data?.items);
      console.log("This is related video data", data);
    } catch (error) {
      console.error;
      (error, "error fetching related videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedVideos();
  }, [categoryId]);

  return (
    <div>
      {relatedVideos?.map((video) => (
        <Link
          to={`/video/${video.snippet.categoryId}/${video.id.videoId || video.id}`}
        >
          <div className="flex flex-col xl:flex-row mb-2 ">
            <div className="relative h-[200px] lg:h-[140px] w-[400px] min-w-[230px] lg:w-60 md:rounded-xl overflow-hidden">
              <img
                src={video.snippet.thumbnails?.medium?.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover rounded-md mb-2"
              />
              <span className="absolute bottom-4 right-0 bg-gray-800 text-white text-sm p-1 m-1 rounded">
                {formatDuration(video.contentDetails?.duration)}
              </span>
            </div>

            <div className="flex mt-3">
              <div
                className={`flex flex-col ml-3 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
              >
                <h3 className="font-semibold text-md line-clamp-3">
                  {video.snippet.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {video.snippet.channelTitle}
                </span>
                <span className="text-xs text-gray-500">
                  {formatViewCount(video?.statistics?.viewCount)} . views {""}
                  {formatPublishTime(video.snippet.publishedAt)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideo;
