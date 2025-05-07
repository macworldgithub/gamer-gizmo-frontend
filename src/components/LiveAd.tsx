"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const LiveAdSection = ({
  className = "w-full h-96",
  category = "Laptops",
  adId = 1,
}) => {
  const [adImages, setAdImages] = useState<any[]>([]);
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

  const isVideo = (url: string) => {
    return (
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".avi")
    );
  };

  // const adUrl = selectedAd
  //   ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${
  //       selectedAd.url.startsWith("/") ? selectedAd.url : "/" + selectedAd.url
  //     }`
  //   : "";

  const adUrl = selectedAd
    ? selectedAd.url.startsWith("http")
      ? selectedAd.url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${
          selectedAd.url.startsWith("/") ? selectedAd.url : "/" + selectedAd.url
        }`
    : "";

  return (
    // <div
    //   className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex items-center ${className}`}
    // >
    //   {loading && <p>Loading Ads...</p>}
    //   {error && <p className="text-red-500">{error}</p>}

    //   {selectedAd ? (
    //     <div className="relative w-full h-full rounded overflow-hidden">
    //       {isVideo(adUrl) ? (
    //         <video controls className="w-full h-full object-cover rounded">
    //           <source src={adUrl} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //       ) : (
    //         <img
    //           src={adUrl}
    //           alt={`Live Advertisement ${adId}`}
    //           className="w-full h-full object-cover rounded"
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
      {!loading && error && <p className="text-red-500">{error}</p>}

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
              onLoad={() => setError(null)} // Reset error if image loads successfully
              onError={(e) => {
                setError("Failed to load image");
                // Optionally use fallback:
                // e.currentTarget.src = "/fallback.png";
              }}
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
