"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomLoader from "@/components/CustomLoader";
import { formatDate } from "@/app/utils/formatDate";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

// Define TypeScript interface for Blog Post data
interface BlogPostData {
  id: number;
  admin_id: number;
  title: string;
  content: string;
  images: string;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verified_by: number;
  is_published: boolean;
  tags: string;
  views: number;
  slug: string;
}

const fetchBlogBySlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getSingleBlogsDetails?slug=${slug}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data || null;
};

export default function BlogDetail() {
  // const { title } = useParams<{ title: string }>();
  const { title } = useParams<{ title: string }>();
  const decodedSlug = decodeURIComponent(title);

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  console.log(post, "post");
  // useEffect(() => {
  //   if (!title) return;
  //   setLoading(true);
  //   fetchBlogBySlug(title as string)
  //     .then((data) => {
  //       setPost(data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError("Failed to load blog.");
  //       setLoading(false);
  //     });
  // }, [title]);
  useEffect(() => {
    if (!decodedSlug) return;
    setLoading(true);
    fetchBlogBySlug(decodedSlug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog.");
        setLoading(false);
      });
  }, [decodedSlug]);

  if (loading) return <CustomLoader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-red-500">Post not found.</p>;

  return (
    <div className="dark:bg-black min-h-screen max-md:container py-10">
      <Wrapper>
        <article className="mx-auto bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden">
          {post.images && (
            <div className="relative h-[400px] w-full">
              <Image
                src={post.images}
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
                {post.tags.split(',').map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            <h1 className="text-2xl  font-bold text-gray-900 dark:text-white mb-6 leading-tight max-md:text-base">
              {post.title}
            </h1>

            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-a:text-purple-600 hover:prose-a:text-purple-500
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-ul:list-disc prose-ol:list-decimal
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500
                prose-img:rounded-lg max-md:text-sm"
            />
          </div>
        </article>
      </Wrapper>
    </div>
  );
}
