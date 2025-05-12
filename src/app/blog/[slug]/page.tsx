"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "@/components/CustomLoader";
import { formatDate } from "@/app/utils/formatDate";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

// Define TypeScript interface for Blog Post data
interface BlogPostData {
  blogId: number;
  created_at: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>(); // Ensure slug is typed correctly
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getSingleBlogsDetails?id=${slug}`
      );
      const blog = response.data.data;

      if (!blog) throw new Error("Blog post not found");

      const formattedBlog: BlogPostData = {
        blogId: blog.id,
        created_at: blog.created_at,
        image: blog.images || "/images/default.png",
        title: blog.title,
        description: blog.content,
        tags: blog.tags ? blog.tags.split(",") : [],
      };

      setPost(formattedBlog);
    } catch (error) {
      setError("Failed to fetch blog data!");
      toast.error("Failed to fetch blog data!");
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetchBlog();
  }, [slug]);

  if (loading) return <CustomLoader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className="dark:bg-black">
      <Wrapper>
        <div className="w-full mx-auto p-6 dark:bg-[#1e1e2f] text-black dark:text-white">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${post.image}`}
            alt={post.title}
            width={600}
            height={100}
            className=" object-cover rounded-md w-full h-80"
          />

          <p className="text-sm text-purple-600 font-semibold mt-4 ">
            {formatDate(post.created_at)}
          </p>
          <div className="flex space-x-2 mt-4 ">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium "
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold mt-2 dark:text-white lg:text-lg max-md:text-sm md:text-lg text-black">
            {post.title}
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
            className="text-gray-600 mt-4 text-justify dark:text-white max-md:text-sm lg:text-sm"
          />
        </div>
      </Wrapper>
    </div>
  );
}
