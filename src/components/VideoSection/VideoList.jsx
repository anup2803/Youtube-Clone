import React, { useEffect, useState } from "react";
import { useTheme } from "../../useContextHook/useTheme";
import {
  formatDuration,
  formatPublishTime,
  formatViewCount,
} from "../../utils/helper";
import { Link } from "react-router-dom";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";

const VideoList = ({ video }) => {
  if (!video || !video.snippet) return null;

  const { isDarkMode } = useTheme();
  const [channelData, setChannelData] = useState(null);

  const fetchChannelData = async () => {
    const data = await fetchApiForYoutubeData("channels", {
      part: "snippet,contentDetails,statistics",
      id: video.snippet.channelId,
    });
    setChannelData(data?.items?.[0]);
  };

  useEffect(() => {
    if (video?.snippet?.channelId) {
      fetchChannelData();
    }
  }, [video?.snippet?.channelId]);

  return (
    <Link
      to={`/video/${video.snippet.categoryId}/${video.id.videoId || video.id}`}
    >
      <div className="flex flex-col mb-8">
        <div className="relative md:rounded-xl overflow-hidden">
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
          <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={channelData?.snippet?.thumbnails?.medium?.url}
              alt={channelData?.snippet?.title}
              className="w-full h-full object-cover "
            />
          </div>

          <div
            className={`flex flex-col ml-3 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
          >
            <h3 className="font-bold text-md line-clamp-2">
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
  );
};

export default VideoList;
