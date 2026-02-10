import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";
import { formatPublishTime, formatViewCount } from "../../utils/helper";
import { FaDownload, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { format } from "date-fns";
import VideoComments from "./VideoComments";
import RelatedVideo from "./RelatedVideo";

const VideoDetails = () => {
  const { categoryId, videoId } = useParams();

  const { setLoading } = useAppContext();
  const { isDarkMode } = useTheme();
  const [comments, setComments] = useState();
  const [selcetedVideoDetails, setSelcectedVideoDetails] = useState();
  const [channelData, setChannelData] = useState();
  const [showFullDescriptions, setShowFullDescriptions] = useState(false);

  const fetchSelectedVideoDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("videos", {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      });
      setSelcectedVideoDetails(data?.items[0]);
    } catch (error) {
      console.log(error, "error fetching selceted video");
    } finally {
      setLoading(false);
    }
  };
  const fetchVideoComments = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("commentThreads", {
        part: "snippet",
        videoId: videoId,
        maxResults: 10,
      });
      setComments(data?.items);
    } catch (error) {
      console.log(error, "error fetching channel Data ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!videoId) return;
    fetchSelectedVideoDetails();
    fetchVideoComments();
  }, [videoId]);

  console.log("videoId from URL:", videoId);

  const fetchChannelData = async () => {
    if (selcetedVideoDetails?.snippet?.channelId) {
      setLoading(true);
      try {
        const data = await fetchApiForYoutubeData("channels", {
          part: "snippet,contentDetails,statistics",
          id: selcetedVideoDetails?.snippet?.channelId,
        });
        setChannelData(data?.items[0]);
      } catch (error) {
        console.log(error, "error fetching channel Data ");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selcetedVideoDetails?.snippet?.channelId) {
      fetchChannelData();
    }
  }, [selcetedVideoDetails?.snippet?.channelId]);

  const toggleDescriptions = () => {
    setShowFullDescriptions(!showFullDescriptions);
  };

  const description = selcetedVideoDetails?.snippet?.description || "";
  const truncatedDescription = description.slice(0, 240);

  return (
    <div
      className={`flex justify-center flex-row h-full ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <div className="w-full flex flex-col p-4 lg:flex-row lg:space-x-4">
        <div className=" flex flex-col lg:w-[70%] px-4 py-3 lg:py-6 overflow-auto">
          <div className="h-[300px] md:h-[450px] lg:h-[500px] xl:h-[600px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
            {videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          {selcetedVideoDetails && (
            <div className="mt-4 flex flex-col gap-6">
              <h2 className="text-xl font-bold">
                {selcetedVideoDetails?.snippet?.title}
              </h2>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center mb-4 lg:mb-0">
                  <img
                    className="w-12 h-12 rounded-full cursor-pointer"
                    src={channelData?.snippet?.thumbnails?.default?.url}
                    alt={channelData?.snippet?.title}
                  />
                  <div className=" mt-2 ml-2 lg:mt-0">
                    <h3 className="text-lg font-bold cursor-pointer ">
                      {channelData?.snippet?.title}
                    </h3>
                    <p
                      className={`${isDarkMode ? "text-gray-100" : "text-gray-700"} {" "}text-sm`}
                    >
                      {formatViewCount(
                        channelData?.statistics?.subscriberCount,
                      )}{" "}
                      subscribers
                    </p>
                  </div>
                  <button
                    className={` font-semibold px-6 py-2 lg:py-3 mt-2 lg:mt-0 lg:ml-1 rounded-full  cursor-pointer ${isDarkMode ? "bg-white text-black " : "bg-black text-white"} `}
                  >
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <button
                    className={` flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-3 ${isDarkMode ? "bg-black " : "bg-slate-200"}`}
                  >
                    <FaThumbsUp />
                    <span className="">
                      {formatViewCount(
                        selcetedVideoDetails?.statistics?.likeCount,
                      )}
                    </span>
                    <div className="h-5 w-[1px] bg-gray-400 mx-2"></div>
                    <FaThumbsDown />
                  </button>
                  {/* downlaod */}
                  <button
                    className={` flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-3 ${isDarkMode ? "bg-black " : "bg-slate-200"}`}
                  >
                    <FaDownload />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="bg-slate-200 rounded-xl p-4">
                <p className="text-gray-900">
                  {formatViewCount(selcetedVideoDetails?.statistics?.viewCount)}{" "}
                  views {""}
                  {formatPublishTime(
                    selcetedVideoDetails?.snippet?.publishedAt,
                  )}
                </p>
                <p className="text-black">
                  {showFullDescriptions ? description : truncatedDescription}
                  {description.length > 240 && (
                    <button
                      className="text-blue-500 ml-2"
                      onClick={toggleDescriptions}
                    >
                      {showFullDescriptions ? "show less" : "show more"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}
          <div className="mt-8">
            <p
              className={`${isDarkMode ? "text-gray-200" : "text-black"} font-semibold text-lg`}
            >
              {formatViewCount(selcetedVideoDetails?.statistics?.commentCount)}{" "}
              {""}
              Comments
            </p>
          </div>
          {comments?.map((comment) => (
            <VideoComments comment={comment} key={comment.id} />
          ))}
        </div>

        <div className="lg:w-[30%] p-4 ">
          <h3 className="text-xl font-bold mb-4">Related Videos</h3>
          <RelatedVideo categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
