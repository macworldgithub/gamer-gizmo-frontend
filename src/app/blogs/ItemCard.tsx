// import Image from "next/image";

// const blogPosts = [
//   {
//     id: 1,
//     author: "Alec Whitten",
//     date: "1 Jan 2023",
//     title: "Bill Walsh leadership lessons",
//     description:
//       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
//     tags: ["Leadership", "Management"],
//   },
//   {
//     id: 2,
//     author: "Demi Wilkinson",
//     date: "1 Jan 2023",
//     title: "PM mental models",
//     description:
//       "Mental models are simple expressions of complex processes or relationships.",
//     tags: ["Product", "Research", "Frameworks"],
//   },
//   {
//     id: 3,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//   },
// ];

// export default function BlogCards() {
//   return (
//     <div className="container mx-auto p-4 ">
//       <h2 className="text-2xl font-bold mb-6 ">All blog posts</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {blogPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-sm mx-auto text-left"
//           >
//             <Image
//               src="/images/leon.png"
//               alt={post.title}
//               width={400}
//               height={250}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <p className="text-sm text-gray-600">
//                 {post.author} • {post.date}
//               </p>
//               <h3 className="text-lg font-semibold mt-1 mb-2">{post.title}</h3>
//               <p className="text-gray-700 mb-3">{post.description}</p>
//               <div className="flex flex-wrap gap-2">
//                 {post.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";

// const blogPosts = [
//   {
//     id: 1,
//     author: "Alec Whitten",
//     date: "1 Jan 2023",
//     title: "Bill Walsh leadership lessons",
//     description:
//       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
//     tags: ["Leadership", "Management"],
//   },
//   {
//     id: 2,
//     author: "Demi Wilkinson",
//     date: "1 Jan 2023",
//     title: "PM mental models",
//     description:
//       "Mental models are simple expressions of complex processes or relationships.",
//     tags: ["Product", "Research", "Frameworks"],
//   },
//   {
//     id: 3,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//   },
//   {
//     id: 4,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//   },
//   {
//     id: 5,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//   },
// ];

// export default function BlogCards() {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 text-center">All Blog Posts</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
//         {blogPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white shadow-lg  overflow-hidden w-full max-w-sm mx-auto"
//           >
//             <Image
//               src="/images/leon.png"
//               alt={post.title}
//               width={400}
//               height={250}
//               className="w-full h-44 object-cover"
//             />
//             <div className="p-4">
//               <p className="text-sm text-gray-600">
//                 {post.author} • {post.date}
//               </p>
//               <h3 className="text-lg font-semibold mt-2 mb-2">{post.title}</h3>
//               <p className="text-gray-700 text-sm mb-3">{post.description}</p>
//               <div className="flex flex-wrap gap-2">
//                 {post.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";

// const blogPosts = [
//   {
//     id: 1,
//     author: "Alec Whitten",
//     date: "1 Jan 2023",
//     title: "Bill Walsh leadership lessons",
//     description:
//       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
//     tags: ["Leadership", "Management"],
//     image: "/images/weather.png",
//   },
//   {
//     id: 2,
//     author: "Demi Wilkinson",
//     date: "1 Jan 2023",
//     title: "PM mental models",
//     description:
//       "Mental models are simple expressions of complex processes or relationships.",
//     tags: ["Product", "Research", "Frameworks"],
//     image: "/images/meeting.png",
//   },
//   {
//     id: 3,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//     image: "/images/computer.png",
//   },
//   {
//     id: 4,
//     author: "Natali Craig • ",
//     date: "1 Jan 2023",
//     title: "How collaboration makes us better designers",
//     description:
//       "Collaboration can make our teams stronger, and our individual designs better.",
//     tags: ["Design", "Research"],
//     image: "/images/collaboration.png",
//   },
//   {
//     id: 5,
//     author: "Drew Cano •  ",
//     date: "1 Jan 2023",
//     title: "Our top 10 Javascript frameworks to use designers",
//     description:
//       "JavaScript frameworks make development easy with extensive features and functionalities.",
//     tags: ["softwareDevelopment", "Tools", "Saas"],
//     image: "/images/java.png",
//   },
//   {
//     id: 5,
//     author: "Orlando Diggs • ",
//     date: "1 Jan 2023",
//     title: "Podcast: Creating a better CX Community",
//     description:
//       "Starting a community doesn’t need to be complicated, but how do you get started?",
//     tags: ["Podcast", "Customer Success"],
//     image: "/images/podcast.png",
//   },
// ];

// export default function BlogCards() {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-8 text-center ">All Blog Posts</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto max-md:grid-cols-2 md:bg-red-500 lg:bg-purple-500 max-md:bg-orange-500">
//         {blogPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white shadow-lg overflow-hidden w-full max-w-sm mx-auto"
//           >
//             <Image
//               src={post.image}
//               alt={post.title}
//               width={400}
//               height={250}
//               className="w-full h-44 object-cover"
//             />
//             <div className="p-4">
//               <p className="text-sm text-purple-400 ">
//                 {post.author} • {post.date}
//               </p>
//               <h3 className="text-lg font-semibold mt-2 mb-2">{post.title}</h3>
//               <p className="text-gray-700 text-sm mb-3">
//                 {post.description}
//               </p>
//               <div className="flex flex-wrap gap-2 ">
//                 {post.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-purple-300 text-gray-800 text-xs font-semibold px-2 py-1 rounded"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";

// const blogPosts = [
//   {
//     id: 1,
//     author: "Alec Whitten",
//     date: "1 Jan 2023",
//     title: "Bill Walsh leadership lessons",
//     description:
//       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
//     // tags: ["Leadership", "Management"],
//     image: "/images/weather.png",
//   },
//   {
//     id: 2,
//     author: "Demi Wilkinson",
//     date: "1 Jan 2023",
//     title: "PM mental models",
//     description:
//       "Mental models are simple expressions of complex processes or relationships.",
//     // tags: ["Product", "Research", "Frameworks"],
//     image: "/images/meeting.png",
//   },
// {
//   id: 3,
//   author: "Candice Wu",
//   date: "1 Jan 2023",
//   title: "What is Wireframing?",
//   description:
//     "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//   // tags: ["Design", "Research"],
//   image: "/images/computer.png",
// },
// {
//   id: 4,
//   author: "Natali Craig • ",
//   date: "1 Jan 2023",
//   title: "How collaboration makes us better designers",
//   description:
//     "Collaboration can make our teams stronger, and our individual designs better.",
//   // tags: ["Design", "Research"],
//   image: "/images/collaboration.png",
// },
// {
//   id: 5,
//   author: "Drew Cano •  ",
//   date: "1 Jan 2023",
//   title: "Our top 10 Javascript frameworks to use designers",
//   description:
//     "JavaScript frameworks make development easy with extensive features and functionalities.",
//   // tags: ["softwareDevelopment", "Tools", "Saas"],
//   image: "/images/java.png",
// },
// {
//   id: 5,
//   author: "Orlando Diggs • ",
//   date: "1 Jan 2023",
//   title: "Podcast: Creating a better CX Community",
//   description:
//     "Starting a community doesn’t need to be complicated, but how do you get started?",
//   // tags: ["Podcast", "Customer Success"],
//   image: "/images/podcast.png",
// },
// ];

// export default function BlogCards() {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-8 text-center ">All Blog Posts</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
//         {blogPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white shadow-lg overflow-hidden w-full max-w-sm md:max-w-xs mx-auto"
//           >
//             <Image
//               src={post.image}
//               alt={post.title}
//               width={400}
//               height={250}
//               className="w-full h-40 sm:h-44 md:h-36 object-cover"
//             />
//             <div className="p-3 sm:p-4 md:p-3">
//               <p className="text-xs sm:text-sm md:text-xs text-purple-400 lg:text-lg">
//                 {post.author} • {post.date}
//               </p>
//               <h3 className="text-base sm:text-lg md:text-xs font-semibold mt-2 mb-2 lg:text-xl">
//                 {post.title}
//               </h3>
//               <p className="text-xs sm:text-sm md:text-xs text-gray-700 mb-3 lg:text-xl">
//                 {post.description}
//               </p>
//               {/* <div className="flex flex-wrap gap-1 sm:gap-2">
//                 {post.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-purple-300 text-gray-800 text-[10px] sm:text-xs md:text-[9px] font-semibold px-2 py-1 rounded lg:text-sm"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";

// const tagColors = {
//   Product: "bg-blue-100 text-blue-600",
//   Research: "bg-indigo-100 text-indigo-600",
//   Frameworks: "bg-orange-100 text-orange-600",
//   Leadership: "bg-green-100 text-green-600",
//   Management: "bg-teal-100 text-teal-600",
//   Design: "bg-pink-100 text-pink-600",
//   Tools: "bg-gray-100 text-gray-600",
//   Saas: "bg-yellow-100 text-yellow-600",
//   Podcast: "bg-red-100 text-red-600",
//   "Customer Success": "bg-purple-100 text-purple-600",
// };

// const blogPosts = [
//   {
//     id: 1,
//     author: "Alec Whitten",
//     date: "1 Jan 2023",
//     title: "Bill Walsh leadership lessons",
//     description:
//       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
//     tags: ["Leadership", "Management"],
//     image: "/images/weather.png",
//   },
//   {
//     id: 2,
//     author: "Demi Wilkinson",
//     date: "1 Jan 2023",
//     title: "PM mental models",
//     description:
//       "Mental models are simple expressions of complex processes or relationships winning Dynasty?.",
//     tags: ["Product", "Research", "Frameworks"],
//     image: "/images/meeting.png",
//   },
//   {
//     id: 3,
//     author: "Candice Wu",
//     date: "1 Jan 2023",
//     title: "What is Wireframing?",
//     description:
//       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
//     tags: ["Design", "Research"],
//     image: "/images/computer.png",
//   },
// {
//   id: 4,
//   author: "Natali Craig • ",
//   date: "1 Jan 2023",
//   title: "How collaboration makes us better designers",
//   description:
//     "Collaboration can make our teams stronger, and our individual designs better.",
//   tags: ["Design", "Research"],
//   image: "/images/collaboration.png",
// },
// {
//   id: 5,
//   author: "Drew Cano •  ",
//   date: "1 Jan 2023",
//   title: "Our top 10 Javascript frameworks to use designers",
//   description:
//     "JavaScript frameworks make development easy with extensive features and functionalities.",
//   tags: ["softwareDevelopment", "Tools", "Saas"],
//   image: "/images/java.png",
// },
// {
//   id: 6,
//   author: "Orlando Diggs • ",
//   date: "1 Jan 2023",
//   title: "Podcast: Creating a better CX Community",
//   description:
//     "Starting a community doesn’t need to be complicated, but how do you get started?",
//   tags: ["Podcast", "Customer Success"],
//   image: "/images/podcast.png",
// },
// ];

// export default function BlogCards() {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-8 text-center">All Blog Posts</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
//         {blogPosts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white shadow-lg overflow-hidden w-full max-w-sm md:max-w-xs mx-auto lg:max-w-xl"
//           >
//             <Image
//               src={post.image}
//               alt={post.title}
//               width={400}
//               height={250}
//               className="w-full h-40 sm:h-44 md:h-36 object-cover"
//             />
//             <div className="p-3 sm:p-4 md:p-3">
//               <p className="text-xs sm:text-sm md:text-xs text-purple-400 lg:text-lg">
//                 {post.author} • {post.date}
//               </p>
//               <h3 className="text-base sm:text-xs md:text-xs font-semibold mt-2 mb-2 lg:text-sm">
//                 {post.title}
//               </h3>
//               <p className="text-xs sm:text-sm md:text-xs text-gray-700 mb-3 lg:text-sm">
//                 {post.description}
//               </p>
//               <div className="flex flex-wrap gap-1 sm:gap-2">
//                 {post.tags?.map((tag, index) => (
//                   <span
//                     key={index}
//                     className={`px-2 py-1 rounded font-semibold
//         text-xs sm:text-sm md:text-[10px] lg:text-sm
//         md:px-1.5 lg:px-2
//         md:py-0.5 lg:py-1
//         ${tagColors[tag] || "bg-gray-200 text-gray-700"}
//       `}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";

const tagColors = {
  Product: "bg-blue-100 text-blue-600",
  Research: "bg-indigo-100 text-indigo-600",
  Frameworks: "bg-orange-100 text-orange-600",
  Leadership: "bg-green-100 text-green-600",
  Management: "bg-teal-100 text-teal-600",
  Design: "bg-pink-100 text-pink-600",
  Tools: "bg-gray-100 text-gray-600",
  Saas: "bg-yellow-100 text-yellow-600",
  Podcast: "bg-red-100 text-red-600",
  "Customer Success": "bg-purple-100 text-purple-600",
};

const blogPosts = [
  {
    id: 1,
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    tags: ["Leadership", "Management"],
    image: "/images/weather.png",
  },
  {
    id: 2,
    author: "Demi Wilkinson",
    date: "1 Jan 2023",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships winning Dynasty?.",
    tags: ["Product", "Research", "Frameworks"],
    image: "/images/meeting.png",
  },
  {
    id: 3,
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: ["Design", "Research"],
    image: "/images/computer.png",
  },
  {
    id: 4,
    author: "Natali Craig • ",
    date: "1 Jan 2023",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    tags: ["Design", "Research"],
    image: "/images/collaboration.png",
  },
  {
    id: 5,
    author: "Drew Cano •  ",
    date: "1 Jan 2023",
    title: "Our top 10 Javascript frameworks to use designers",
    description:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    tags: ["softwareDevelopment", "Tools", "Saas"],
    image: "/images/java.png",
  },
  {
    id: 6,
    author: "Orlando Diggs • ",
    date: "1 Jan 2023",
    title: "Podcast: Creating a better CX Community",
    description:
      "Starting a community doesn’t need to be complicated, but how do you get started?",
    tags: ["Podcast", "Customer Success"],
    image: "/images/podcast.png",
  },
];

export default function BlogCards() {
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
        All Blog Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:max-w-6xl mx-auto">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg overflow-hidden w-full max-w-xs sm:max-w-xs md:max-w-xs mx-auto lg:max-w-xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-36 sm:h-40 md:h-36 object-cover"
            />
            <div className="p-2 sm:p-3 md:p-4">
              <p className="text-xs sm:text-sm md:text-xs text-purple-400 lg:text-lg">
                {post.author} • {post.date}
              </p>
              <h3 className="text-sm sm:text-xs md:text-xs font-semibold mt-2 mb-1 lg:text-sm">
                {post.title}
              </h3>
              <p className="text-xs sm:text-xs md:text-xs text-gray-700 mb-2 lg:text-sm">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded font-semibold 
        text-[10px] sm:text-[7px] md:text-[10px] lg:text-sm  
        px-1 sm:px-1.5 md:px-1.5 lg:px-2 
        py-0.5 sm:py-1 md:py-0.5 lg:py-1
        ${tagColors[tag] || "bg-gray-200 text-gray-700"} 
      `}
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
