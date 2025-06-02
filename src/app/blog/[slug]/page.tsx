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
    <div className="dark:bg-black min-h-screen py-10">
      <Wrapper>
        <article className="max-w-4xl mx-auto bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden">
          {post.image && (
            <div className="relative h-[400px] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm text-purple-600 font-medium">
                {formatDate(post.created_at)}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div
              dangerouslySetInnerHTML={{
                __html: post.description,
              }}
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-a:text-purple-600 hover:prose-a:text-purple-500
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-ul:list-disc prose-ol:list-decimal
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500
                prose-img:rounded-lg"
            />
          </div>
        </article>
      </Wrapper>
    </div>
  );
}
