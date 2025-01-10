import Link from "next/link";

const CommentsSection = () => {
  const comments = [
    {
      id: 1,
      name: "Matthew A. Larrison",
      date: "25 January 2022",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    },
    {
      id: 2,
      name: "Joshua S. Flores",
      date: "25 January 2022",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    },
    {
      id: 3,
      name: "Daniel C. Stackhouse",
      date: "25 January 2022",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 border border-Gray dark:bg-black dark:border-[#6345ED]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-white">
        People Comments
      </h2>
      <div className="space-y-6">
        {comments.map((item) => (
          <div
            key={item.id}
            className="dark:bg-black flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg p-4 sm:space-x-4 space-y-4 sm:space-y-0"
          >
            {/* User Avatar */}
            <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center text-gray-500 text-sm ">
              80X80
            </div>

            {/* User Info */}
            <div className="flex-1 ">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-white">{item.date}</p>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed dark:text-[#616161]">
                {item.comment}
              </p>
              <Link
                href="#"
                className="text-blue-600 hover:underline mt-2 inline-flex items-center space-x-1 text-sm"
              >
                <span>Reply</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
