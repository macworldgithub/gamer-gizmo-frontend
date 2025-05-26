import { LazyVideo } from "./LazyVideo"; // Adjust import as needed

export default function BrowseVideos() {
  const videos = [
    {
      src: "https://www.youtube.com/watch?v=3v2BbXvG3Y8",
      poster: "/images/gameIcon.webp",
    },
    {
      src: "https://www.youtube.com/watch?v=HazSYe19wR4",
      poster: "/images/gameIcon.webp",
    },
    {
      src: "https://www.youtube.com/watch?v=gzg3bmHC3CQ",
      poster: "/images/gameIcon.webp",
    },
    {
      src: "https://www.youtube.com/watch?v=kKH6QKo2Pmc",
      poster: "/images/gameIcon.webp",
    },
    {
      src: "https://www.youtube.com/watch?v=csSTitLfdMU",
      poster: "/images/gameIcon.webp",
    },
  ];

  const totalSlots = 5;
  const filledVideos = [
    ...videos,
    ...Array(totalSlots - videos.length).fill({ src: "", poster: "" }),
  ];

  return (
    <div className="w-full bg-gray-100 dark:bg-[#1e1e2f]">
      <div className="max-w-5xl mx-auto py-1">
        <div className="text-start mb-6 px-16">
          <h2 className="text-2xl max-md:text-xl dark:text-white font-bold">
            Browse Our Videos
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-16 max-md:px-10">
          <div className="lg:col-span-2 aspect-w-16 h-96 rounded-lg max-sm:h-52 max-sm:w-full overflow-hidden">
            <LazyVideo
              src={filledVideos[0].src}
              poster={filledVideos[0].poster}
            />
          </div>
          <div className="grid grid-cols-2 gap-11 sm:gap-6 max-sm:gap-0 max-sm:flex max-sm:overflow-x-scroll max-sm:space-x-4 max-sm:pb-2 scrollbar-hide">
            {filledVideos.slice(1).map((video, index) => (
              <div
                key={index}
                className="md:aspect-auto sm:h-[11.5rem] rounded-lg overflow-hidden max-sm:w-[70%] max-sm:h-[100%] flex-shrink-0"
              >
                {video.src ? (
                  <LazyVideo src={video.src} poster={video.poster} />
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500">upcoming</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
