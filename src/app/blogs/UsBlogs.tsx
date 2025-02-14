"use client";
import CustomLoader from "@/components/CustomLoader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";
export default function UsBlogs() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getRecentsBlogs`
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
    <div className="max-w-[1200px] mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Recent blog posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data[0] && (
          <div className="lg:col-span-2 space-y-4">
            <Image
              // @ts-expect-error jh jk
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data[0].image}`}
              alt="Office setup"
              width={800}
              height={400}
              className="w-full object-cover"
            />
            <div>
              <p className="text-sm text-purple-600 font-semibold">
                {/* @ts-expect-error jk hk */}
                Gamer Gizmo • {formatDate(data[0].Created_at)}
              </p>
              <h3
                // @ts-expect-error jk kj
                onClick={() => router.push(`/blog/${data[0].blogId}`)}
                className="text-2xl font-bold mt-1 hover:underline cursor-pointer max-md:text-sm dark:text-white"
              >
                {/* @ts-expect-error jsdb */}
                {data[0].title}
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  //  @ts-expect-error jsdb
                  __html: truncateHtml(data[0].description, 100),
                }}
                className="text-gray-600 mt-2 dark:text-white"
              />
              <div className="flex space-x-2 mt-3">
                {/* @ts-expect-error bhj kbj */}
                {data[0].tags.split(",").map((tag, index) => (
                  <span
                    className={`bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium  ${getRandomTagColor()}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Post 2 */}
        <div className="space-y-6">
          {data[1] && (
            <div className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Image
                // @ts-expect-error jh jk
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data[1].image}`}
                alt="Team working"
                width={200}
                height={120}
                className="w-full md:w-40 h-40 object-cover "
              />
              <div>
                <p className="text-xs text-purple-600 font-semibold">
                  {/* @ts-expect-error jk hk */}
                  Gamer Gizmo • {formatDate(data[1].Created_at)}
                </p>

                <h3
                  // @ts-expect-error jk kj
                  onClick={() => router.push(`/blog/${data[1].blogId}`)}
                  className="text-lg font-bold mt-1 hover:underline cursor-pointer max-md:text-sm dark:text-white"
                >
                  {/* @ts-expect-error jsdb */}
                  {data[1].title.slice(0, 10)}...
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    //  @ts-expect-error jsdb
                    __html: truncateHtml(data[1].description, 40),
                  }}
                  className="text-gray-600 mt-2 text-sm line-clamp-4 dark:text-white"
                />

                <div className="flex space-x-2 mt-2">
                  {/* @ts-expect-error bhj kbj */}
                  {data[1].tags.split(",").map((tag, index) => (
                    <span
                      className={`bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium  ${getRandomTagColor()}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {data[2] && (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Image
                // @ts-expect-error jk jk
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data[2].image}`}
                alt="Workspace"
                width={200}
                height={100}
                className="w-full md:w-40 h-40 object-cover"
              />
              <div>
                <p className="text-xs text-purple-600 font-semibold">
                  {/* @ts-expect-error jk hk */}
                  Gamer Gizmo • {formatDate(data[2].Created_at)}
                </p>
                <h3
                  // @ts-expect-error jk kj
                  onClick={() => router.push(`/blog/${data[2].blogId}`)}
                  className="text-lg font-bold mt-1 hover:underline cursor-pointer max-md:text-sm dark:text-white"
                >
                  {/* @ts-expect-error jsdb */}
                  {data[2].title.slice(0, 10)}...
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    //  @ts-expect-error jsdb
                    __html: truncateHtml(data[2].description, 40),
                  }}
                  className="text-gray-600 mt-2 text-sm line-clamp-4 dark:text-white"
                />
                <div className="flex space-x-2 mt-2">
                  {/* @ts-expect-error bhj kbj */}
                  {data[2].tags.split(",").map((tag, index) => (
                    <span
                      className={`bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium  ${getRandomTagColor()}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {data[3] && (
          <div className="lg:col-span-12 flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <Image
                // @ts-expect-error jk jk
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data[3].image}`}
                alt="Climate Change"
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center space-y-3 lg:w-1/2">
              <p className="text-xs text-purple-600 font-semibold">
                {/* @ts-expect-error jk hk */}
                Gamer Gizmo • {formatDate(data[3].Created_at)}
              </p>
              <h3
                // @ts-expect-error jk
                onClick={() => router.push(`/blog/${data[3].blogId}`)}
                className="text-2xl font-bold hover:underline cursor-pointer max-md:text-sm dark:text-white"
              >
                {/* @ts-expect-error jkh kj */}
                {data[3].title.slice(0, 100)}...
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  //  @ts-expect-error jsdb
                  __html: truncateHtml(data[3].description, 100),
                }}
                className="text-gray-600 mt-2 text-sm line-clamp-4 dark:text-white"
              />
              <div className="flex space-x-2 mt-2">
                {/* @ts-expect-error bhj kbj */}
                {data[3].tags.split(",").map((tag, index) => (
                  <span
                    className={`bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium  ${getRandomTagColor()}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}
