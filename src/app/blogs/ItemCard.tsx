"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getAll`
        );
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getTimeAgoOrDate = (dateString: string): string => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffMs = now.getTime() - postedDate.getTime();

    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (diffHours < 24) {
      if (diffHours === 0 && minutes === 0) return "Just now";
      if (diffHours === 0)
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      return `${diffHours} hour${diffHours > 1 ? "s" : ""}${
        minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
      } ago`;
    }

    // Fallback to full datetime for older posts
    return postedDate.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl max-md:pl-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white text-black">All Blogs</h1>
      {blogs.length > 0 ? (
        <div className="space-y-6 text-black">
          {blogs.map((blog: any) => (
            <div
              key={blog.id}
              className="flex items-start space-x-2  border-b pb-4 cursor-pointer text-black dark:text-white"
              onClick={() => router.push(`/blog/${blog.id}`)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.images}`}
                alt={blog.title}
                width={120}
                height={80}
                className="w-32 h-20 object-cover"
              />
              <div className="flex-1">
                <p className="text-gray-500 text-xs">
                  {getTimeAgoOrDate(blog.created_at)}
                </p>

                <h3 className="font-bold md:text-[0.6rem] lg:text-xs hover:underline dark:text-white text-black">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
}
