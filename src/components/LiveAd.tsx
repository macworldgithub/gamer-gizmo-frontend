"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const LiveAdSection = ({ className = "w-full h-96" }) => {
  const [adImages, setAdImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdImages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch?page=Laptops`
        );
        console.log("Response Data:", response.data);

        const ads = response.data;
        if (ads.length > 0) {
          // const imageUrls = ads.map(
          //   (ad: any) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ad.url}`
          // );

          const imageUrls = ads.map((ad: any) => {
            // Ensure there is no double slash
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${
              ad.url.startsWith("/") ? ad.url : "/" + ad.url
            }`;
            return url;
          });
          setAdImages(imageUrls);
          console.log("Images", imageUrls);
        } else {
          setError("No live ads available");
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to load ad images");
      } finally {
        setLoading(false);
      }
    };

    fetchAdImages();
  }, []);

  return (
    <div
      className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center p-4 sm:p-6 ${className}`}
    >
      <h1 className="font-bold text-2xl mb-2">Advertising</h1>

      {loading && <p>Loading Ads...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {adImages.length > 0 ? (
  <div className="flex flex-wrap justify-center">
    {adImages.slice(0, 4).map((imageUrl, index) => (
      <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2">
        <Image
          src={imageUrl}
          alt={`Live Advertisement ${index + 1}`}
          className="w-full h-auto rounded shadow-md"
          onError={() => setError("Failed to load image")}
          width={500}
          height={300}
        />
      </div>
    ))}
  </div>
) : !loading ? (
  <p>No ads available</p>
) : null}

    </div>
  );
};

export default LiveAdSection;
