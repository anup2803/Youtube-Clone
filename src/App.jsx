import Header from "./components/HeaderSection/Header";
import { Routes, Route } from "react-router-dom";
import Feed from "./components/FeedSection/Feed";
import Search from "./components/SearchSection/Search";
import VideoList from "./components/VideoSection/VideoList";
import VideoDetails from "./components/VideoSection/VideoDetails";

const App = () => {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/video/:categoryId/:videoId" element={<VideoDetails />} />
      </Routes>
    </div>
  );
};

export default App;
