"use client";

import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

// Define TypeScript interface for Blog Post data (only fields used here)
interface BlogPostData {
  title: string;
  content: string;
  images?: string;
  created_at: string;
  tags: string;
}

export default function BlogDetail({ post }: { post: BlogPostData }) {
  return (
    <div className="dark:bg-black min-h-screen max-md:container py-10">
      <Wrapper>
        <article className="mx-auto bg-white dark:bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden">
          {post.images && (
            <div className="relative h-[400px] w-full">
              <Image
                src={post?.images}
                alt={post?.title}
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
