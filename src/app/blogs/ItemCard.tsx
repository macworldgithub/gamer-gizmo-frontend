"use client";
import CustomLoader from "@/components/CustomLoader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";

const tagColors = [
  "bg-blue-100 text-blue-600",
  "bg-indigo-100 text-indigo-600",
  "bg-orange-100 text-orange-600",
  "bg-green-100 text-green-600",
  "bg-teal-100 text-teal-600",
  "bg-pink-100 text-pink-600",
  "bg-gray-100 text-gray-600",
  "bg-yellow-100 text-yellow-600",
  "bg-red-100 text-red-600",
  "bg-purple-100 text-purple-600",
];

export default function BlogCards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getAll`
      );
      const blogs = response.data.data.map((blog: any, index: number) => ({
        key: index,
        Created_at: blog.created_at,
        blogId: blog.id,
        image: blog.images,
        title: blog.title,
        description: blog.content,
        tags: blog.tags,
      }));

      setData(blogs);
    } catch (error) {
      toast.error("Failed to fetch blog data!");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const getRandomTagColor = () =>
    tagColors[Math.floor(Math.random() * tagColors.length)];
  useEffect(() => {
    fetchBlogs();
  }, []);
  const truncateHtml = (html: string, limit: number) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Parse HTML
    let text = tempDiv.textContent || tempDiv.innerText || ""; // Extract plain text
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 lg:text-center dark:text-white ">
        All Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:max-w-6xl mx-auto">
        {data &&
          data.length > 0 &&
          data.map((post: any) => (
            <div
              key={post.key}
              className="bg-white dark:bg-black shadow-lg overflow-hidden w-full max-w-xs sm:max-w-xs md:max-w-xs mx-auto lg:max-w-xl  "
            >
              {post.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${post.image}`}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-36 sm:h-40 md:h-36 object-cover"
                />
              )}
              <div className="p-2 sm:p-3 md:p-4">
                <p className="text-xs sm:text-sm md:text-xs text-purple-400 lg:text-lg">
                  Gamer Gizmo • {formatDate(post.Created_at)}
                </p>
                <h3
                  onClick={() => router.push(`/blog/${post.blogId}`)}
                  className="text-sm hover:underline cursor-pointer sm:text-xs md:text-xs font-semibold mt-2 mb-1 lg:text-sm dark:text-white"
                >
                  {post.title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(post.description, 100),
                  }}
                  className="text-xs sm:text-xs md:text-xs text-gray-700 mb-2 lg:text-sm dark:text-white"
                />
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {/* @ts-expect-error khjh jk */}
                  {post.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded font-semibold 
                      text-[10px] sm:text-[7px] md:text-[10px] lg:text-sm  
                      px-1 sm:px-1.5 md:px-1.5 lg:px-2 
                      py-0.5 sm:py-1 md:py-0.5 lg:py-1
          ${getRandomTagColor()}
      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}
