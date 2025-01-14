import Wrapper from "./Common/Wrapper/Wrapper";
import Player from "./Player";

export default function BrowseVideos() {
  const videos = [
    {
      src: "https://www.youtube.com/watch?v=1tEZR9WBLXU&utm_source=chatgpt.com",
      poster: "/images/logo.png",
    },
    {
      src: "https://www.youtube.com/watch?pp=ygUGI3BqY2Fw&v=7e3ZclnmyUE",
      poster: "/images/gameIcon.png",
    },
    {
      src: "https://www.youtube.com/watch?v=1tEZR9WBLXU&utm_source=chatgpt.com",
      poster: "/images/video3-poster.jpg",
    },
    {
      src: "https://www.youtube.com/watch?pp=ygUGI3BqY2Fw&v=7e3ZclnmyUE",
      poster: "/images/video2-poster.jpg",
    },
    // {
    //   src: "https://www.youtube.com/watch?pp=ygUGI3BqY2Fw&v=7e3ZclnmyUE",
    //   poster: "/images/video2-poster.jpg",
    // },
  ];
  return (
    // <Wrapper>
    <div className="w-full  bg-gray-100 dark:bg-[#1e1e2f] -mt-4 -mb-10 ">
      <div className="max-w-5xl mx-auto py-20">
        {/* Heading */}
        <div className="text-start mb-6 px-16 ">
          <h2 className="text-2xl max-md:text-xl dark:text-white font-bold">
            Browse Our Videos
          </h2>
        </div>
        {/* Videos Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-16">
          {/* First Video - Larger */}
          <div className="lg:col-span-2 aspect-w-16 h-96 rounded-lg overflow-hidden max-sm:h-52 max-sm:w-full">
            <Player src={videos[0].src} poster={videos[0].poster} />
          </div>
          {/* Smaller Videos */}
          <div className="grid grid-cols-2 gap-4 max-sm:flex">
            {videos.slice(1).map((video, index) => (
              <div
                key={index}
                className="aspect-auto h-[11.5rem] rounded-lg overflow-hidden "
              >
                <Player src={video.src} poster={video.poster} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </Wrapper>
  );
}
