import { formatDistanceToNow } from "date-fns";
export const formatViewCount = (count) => {
  if (!count) return "0";

  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";

  return count.toString();
};

export const formatPublishTime = (publishTime) => {
  return formatDistanceToNow(new Date(publishTime), { addSuffix: true });
};

export const formatDuration = (duration) => {
  if (!duration) return "00:00";

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

  return [hours, minutes, seconds]
    .filter((v, i) => v !== 0 || i > 0)
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};
