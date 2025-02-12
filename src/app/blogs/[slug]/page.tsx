"use client";
import { useParams } from "next/navigation";
import Image from "next/image";


const blogPosts = [
  {
    id: 1,
    author: "Olivia Rhye",
    date: "1 Jan 2023",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    tags: ["Design", "Research", "Presentation"],
    image: "/images/UX.png",
    slug: "ux-review-presentations",
  },
  {
    id: 2,
    author: "Phoenix Baker",
    date: "1 Jan 2023",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.",
    tags: ["Design", "Research"],
    image: "/images/leon.png",
    slug: "migrating-to-linear-101",
  },
  {
    id: 3,
    author: "Lana Steiner",
    date: "1 Jan 2023",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing APIs efficiently...",
    tags: ["Design", "Research"],
    image: "/images/lana.png",
    slug: "building-your-api-stack",
  },
  {
    id: 4,
    author: "Olivia Rhye",
    date: "1 Jan 2023",
    title: "Grid system for better UI",
    description:
      "A grid system is a design tool used to arrange content on a webpage. It creates structure in a layout.",
    tags: ["Design", "Interface"],
    image: "/images/climate.png",
    slug: "grid-system-for-better-ui",
  },
];

export default function BlogPost() {
  const { slug } = useParams(); 


  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <p className="text-center text-red-500">Post not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full object-cover rounded-md  lg:w-4/5"
      />
      <p className="text-sm text-purple-600 font-semibold mt-4">
        {post.author} • {post.date}
      </p>
      <h1 className="text-3xl font-bold mt-2 dark:text-white">{post.title}</h1>
      <p className="text-gray-600 mt-4 dark:text-white">{post.description}</p>
      <div className="flex space-x-2 mt-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

