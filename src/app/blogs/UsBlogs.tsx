"use client";
import CustomLoader from "@/components/CustomLoader";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { formatDate } from "../utils/formatDate";

interface Blog {
  key: number;
  Created_at: string;
  blogId: number;
  image: string;
  title: string;
  description: string;
  tags: string;
}

export default function UsBlogs() {
  const router = useRouter();
  const [data, setData] = useState<Blog[]>([]);

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

  const getRandomTagColor = () =>
    tagColors[Math.floor(Math.random() * tagColors.length)];
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getRecentsBlogs`
      );

      const blogs: Blog[] = response.data.data.map(
        (blog: any, index: number) => ({
          key: index,
          Created_at: blog.created_at,
          blogId: blog.id,
          image: blog.images || "", // Ensure it's a string
          title: blog.title || "Untitled",
          description: blog.content || "",
          tags: blog.tags || "",
        })
      );

      setData(blogs);
    } catch (error) {
      toast.error("Failed to fetch blog data!");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const truncateHtml = (html: string, limit: number): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className=" mx-auto max-sm:p-1 max-sm:px-2 p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Recent blog posts
      </h2>

      <div className="grid grid-cols-2  max-sm:gap-2 sm:gap-3 md:gap-2 lg:gap-6">
        {data.slice(0, 2).map((blog: Blog, index: number) => (
          <div key={index} className="space-y-2 w-full md:max-w-[480px] ">
            <div className="relative w-full h-[180px] md:h-[250px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.image}`}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <div className="w-full px-2 text-start md:text-left">
              <p className="text-sm text-gray-500 italic">
                GamerGizmo • {formatDate(blog.Created_at)}
              </p>
              <h3
                onClick={() => router.push(`/blog/${blog.blogId}`)}
                className="text-base max-md:text-[0.6rem] font-bold hover:underline cursor-pointer break-words dark:text-white"
              >
                {blog.title}
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: truncateHtml(blog.description, 100),
                }}
                className="text-gray-600 mt-2 text-xs line-clamp-4 dark:text-white"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.tags?.split(",").map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getRandomTagColor()}`}
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
