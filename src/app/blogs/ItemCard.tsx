import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
  },
  {
    id: 2,
    author: "Demi Wilkinson",
    date: "1 Jan 2023",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    id: 3,
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
  },
];

export default function BlogCards() {
  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-2xl font-bold mb-6 ">All blog posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-sm mx-auto text-left"
          >
            <Image
              src="/images/leon.png"
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {post.author} • {post.date}
              </p>
              <h3 className="text-lg font-semibold mt-1 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-3">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
