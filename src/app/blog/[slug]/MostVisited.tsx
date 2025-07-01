"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import LiveAdSection from "@/components/LiveAd";


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
        return `${diffHours} hour${diffHours > 1 ? "s" : ""}${minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
            } ago`;
    }

    return postedDate.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function MostVisited() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getMostVisitedBlogs?limit=10`);
                setBlogs(response.data.data || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="max-w-2xl max-md:w-full max-md:container max-md:pl-8">
            <h1 className="text-2xl font-bold mb-8 dark:text-white text-black">Most Visited Blogs</h1>

            {/* {blogs.length > 0 ? (
                <div className="space-y-6 text-black">
                    {blogs.map((blog: any, index: number) => (
                        <div key={blog.id + "-container"}>
                            <div
                                className="flex items-start space-x-2 border-b pb-4 cursor-pointer text-black dark:text-white"
                                onClick={() => router.push(`/blog/${blog.id}`)}
                            >
                                <Image
                                    src={blog.images}
                                    alt={blog.title}
                                    width={120}
                                    height={80}
                                    className="w-32 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-gray-500 text-xs">
                                        {getTimeAgoOrDate(blog.created_at)}
                                    </p>
                                    <h3 className="font-bold md:text-[0.6rem] max-sm:text-[0.6rem] lg:text-xs hover:underline dark:text-white text-black">
                                        {blog.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="max-sm:w-[95%]">

                                {(index + 1) % 3 === 0 && (() => {
                                    const adId = index + 1;
                                    console.log('Rendering Ad ID:', adId);
                                    return (
                                        <LiveAdSection
                                            key={`ad-${index}`}
                                            category="Blogs"
                                            adId={adId}
                                            className="flex-1 mr-4 md:h-52 max-md:h-40 mt-2"
                                        />
                                    );
                                })()}
                            </div>

                        </div>
                    ))}
                </div>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <p>No blogs found</p>
            )} */}
            {blogs.length > 0 ? (
                <div className="space-y-6 text-black">
                    {blogs.map((blog: any, index: number) => {
                        const shouldRenderAd = (index + 1) % 3 === 0;
                        const adId = Math.floor(index / 3) + 1;

                        return (
                            <div key={blog.id + "-container"}>
                                <div
                                    className="flex items-start space-x-2 border-b pb-4 cursor-pointer text-black dark:text-white"
                                    onClick={() => router.push(`/blog/${blog.id}`)}
                                >
                                    <Image
                                        src={blog.images}
                                        alt={blog.title}
                                        width={120}
                                        height={80}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-xs">
                                            {getTimeAgoOrDate(blog.created_at)}
                                        </p>
                                        <h3 className="font-bold md:text-[0.6rem] max-sm:text-[0.6rem] lg:text-xs hover:underline dark:text-white text-black">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* ✅ Insert LiveAdSection after every 3 blogs */}
                                {shouldRenderAd && (
                                    <div className="max-sm:w-[95%]">
                                        {/* {console.log("Rendering Ad ID:", adId)} */}
                                        <LiveAdSection
                                            key={`ad-${adId}`}
                                            category="Blog Detail"
                                            adId={adId}
                                            className="flex-1 mr-4 md:h-52 max-md:h-40 mt-2"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <p>No blogs found</p>
            )}

        </div>
    );
}
