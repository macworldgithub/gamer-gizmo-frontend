"use client";


import { useEffect, useState } from "react";
import axios from "axios";

const LiveAdSection = ({
  className = "w-full h-96",
  category = "Laptops",
  index = 0, // ✅ NEW: Get which ad to show
}) => {
  const [adImages, setAdImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch?page=${category}`
        );
        console.log("Response Data:", response.data);

        const ads = response.data;
        if (ads.length > 0) {
          const adUrls = ads.map((ad: any) => {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${
              ad.url.startsWith("/") ? ad.url : "/" + ad.url
            }`;
            return url;
          });
          setAdImages(adUrls);
          console.log("Ad URLs", adUrls);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to load ad images");
      } finally {
        setLoading(false);
      }
    };

    fetchAdImages();
  }, [category]);

  const selectedAd = adImages[index]; // ✅ Pick only the ad you want

  // Function to check if the URL is a video
  const isVideo = (url: string) => {
    return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".avi");
  };

  return (
    <div
      className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center ${className}`}
    >
      {loading && <p>Loading Ads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedAd ? (
        <div className="relative w-full h-full overflow-hidden rounded shadow-md ">
          {isVideo(selectedAd) ? (
            <video controls className="object-cover rounded w-full h-full">
              <source src={selectedAd} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedAd}
              alt={`Live Advertisement ${index + 1}`}
              className="object-cover rounded"
              onError={() => setError("Failed to load image")}
            />
          )}
        </div>
      ) : !loading ? (
        <p className="text-center pt-6">No ad available for this slot</p>
      ) : null}
    </div>
  );
};

export default LiveAdSection;

