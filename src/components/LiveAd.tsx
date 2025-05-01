"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

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
          const imageUrls = ads.map((ad: any) => {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${
              ad.url.startsWith("/") ? ad.url : "/" + ad.url
            }`;
            return url;
          });
          setAdImages(imageUrls);
          console.log("Images", imageUrls);
        }
        //  else {
        //   setError("No live ads available");
        // }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to load ad images");
      } finally {
        setLoading(false);
      }
    };

    fetchAdImages();
  }, [category]);

  const selectedImage = adImages[index]; // ✅ Pick only the ad you want

  return (
    <div
      className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center  ${className}`}
    >
      {loading && <p>Loading Ads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedImage ? (
        <div className="relative w-full h-full overflow-hidden rounded shadow-md ">
          <Image
            src={selectedImage}
            alt={`Live Advertisement ${index + 1}`}
            // className="w-full h-auto rounded shadow-md "
            onError={() => setError("Failed to load image")}
            fill // ✅ very important
            className="object-cover rounded" // ✅ important to cover properly
            sizes="100%"
            // width={500}
            // height={300}
          />
        </div>
      ) : !loading ? (
        <p className="text-center pt-6">No ad available for this slot</p>
      ) : null}
    </div>
  );
};

export default LiveAdSection;
