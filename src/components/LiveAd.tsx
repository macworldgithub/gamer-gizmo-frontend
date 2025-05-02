"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const LiveAdSection = ({
  className = "w-full h-96",
  category = "Laptops",
  adId = 1, // Pass adId directly as a number (1, 2, 3, etc.)
}) => {
  const [adImages, setAdImages] = useState<any[]>([]); // Store the full ad object with ID and URL
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
          setAdImages(ads);
          console.log("Ads Data:", ads);
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

  const selectedAd = adImages.find((ad: any) => ad.ad_id === adId); // Find the ad by its ID

  // Function to check if the URL is a video
  const isVideo = (url: string) => {
    return (
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".avi")
    );
  };

  const adUrl = selectedAd
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${
        selectedAd.url.startsWith("/") ? selectedAd.url : "/" + selectedAd.url
      }`
    : "";

  return (
    // <div
    //   className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center ${className}`}
    // >
    //   {loading && <p>Loading Ads...</p>}
    //   {error && <p className="text-red-500">{error}</p>}

    //   {selectedAd ? (
    //     <div className="relative w-full h-full overflow-hidden rounded shadow-md">
    //       {isVideo(adUrl) ? (
    //         <video controls className="object-cover rounded w-full h-full">
    //           <source src={adUrl} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //       ) : (
    //         <img
    //           src={adUrl}
    //           alt={`Live Advertisement ${adId}`}
    //           className="object-cover rounded"
    //           onError={() => setError("Failed to load image")}
    //         />
    //       )}
    //     </div>
    //   ) : !loading ? (
    //     <p className="text-center pt-6">No ad available for this slot</p>
    //   ) : null}
    // </div>
    <div
      className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex items-center ${className}`}
    >
      {loading && <p>Loading Ads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedAd ? (
        <div className="relative w-full h-full rounded overflow-hidden">
          {isVideo(adUrl) ? (
            <video controls className="w-full h-full object-cover rounded">
              <source src={adUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={adUrl}
              alt={`Live Advertisement ${adId}`}
              className="w-full h-full object-cover rounded"
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
