// "use client";
// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const CommentsSection = () => {

//   const comments = [
//     {
//       id: 1,
//       name: "Matthew A. Larrison",
//       date: "25 January 2022",
//       comment:
//         "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
//     },
//     {
//       id: 2,
//       name: "Joshua S. Flores",
//       date: "25 January 2022",
//       comment:
//         "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
//     },
//     {
//       id: 3,
//       name: "Daniel C. Stackhouse",
//       date: "25 January 2022",
//       comment:
//         "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
//     },
//   ];

//   return (
//     <div className="w-full max-w-5xl mx-auto p-4 border border-Gray dark:bg-black dark:border-[#6345ED] rounded-lg max-md:w-[90%] max-md:mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-white">
//         People Comments
//       </h2>
//       <div className="space-y-6">
//         {comments.map((item) => (
//           <div
//             key={item.id}
//             className="dark:bg-black flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg p-4 sm:space-x-4 space-y-4 sm:space-y-0"
//           >
//             {/* User Avatar */}
//             <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center text-gray-500 text-sm ">
//               80X80
//             </div>

//             {/* User Info */}
//             <div className="flex-1 ">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 {item.name}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-white">
//                 {item.date}
//               </p>
//               <p className="mt-2 text-gray-600 text-sm leading-relaxed dark:text-[#616161]">
//                 {item.comment}
//               </p>
//               <Link
//                 href="#"
//                 className="text-blue-600 hover:underline mt-2 inline-flex items-center space-x-1 text-sm"
//               >
//                 <span>Reply</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentsSection;
"use client";
import axiosInstance from "@/app/utils/axios";
import DeleteModal from "@/components/Modals/DeleteModal";
import { RootState } from "@/components/Store/Store";
import { Button, Modal } from "antd";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}
interface Comment {
  id: number;
  user_id: number;
  product_id: number;
  comments: string;
  ratings: number;
  created_at?: string;
  users?: User;
  user_name?: string;
}

const CommentsSection = ({ data }: { data: any }) => {
  const reviewUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/addReview`;
  const deleteUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/deleteReviewById`;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const username = useSelector((state: RootState) => state.user.username);
  const profile = useSelector((state: RootState) => state.user.profile);
  const profileImageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${profile}`;
  const token = useSelector((state: RootState) => state?.user?.token);
  const router = useRouter();

  const userId = useSelector((state: RootState) => state?.user?.id);
  const productId = data?.id;

  useEffect(() => {
    if (data?.product_reviews) {
      console.log("API Product Reviews Data:", data.product_reviews);
      setComments(data.product_reviews);
    }
  }, [data]);



  console.log("User ID from Redux:", userId);
  console.log("All Comments with IDs:", comments);
  

  console.log(userId, "user id");

  console.log(productId, "product id");

  console.log(profileImageUrl, "ayla");

  const handlePostComment = async () => {
    if (!token) {
      toast.error("You must be logged in to comment.");
      router.push("/auth/login");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating.");
      toast.error("Please select a rating.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("product_id", String(productId));
      formData.append("ratings", String(rating));

      if (newComment.trim()) {
        formData.append("comments", newComment);
      }

      const response = await axiosInstance.post(`${reviewUrl}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const newReview = {
          id: Date.now(),
          user_id: userId,
          product_id: productId,
          comments: newComment.trim(),
          ratings: rating,
          created_at: new Date().toISOString(),
          user_name: `User ${userId}`,
        };
//@ts-ignore
        setComments([...comments, newReview]);
        setNewComment("");
        setRating(0);
        setError(null);

        // ✅ Show success toast for 201
        toast.success("Comment posted successfully!");
      }
    } catch (error: any) {
      console.error(error?.response?.data || error);
      const errorMessage =
        error.response?.data?.message?.join(", ") ||
        "Failed to post review. Please try again.";

      setError(errorMessage);

      toast.error(errorMessage);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      const response = await axios?.delete(`${deleteUrl}?review_id=${commentToDelete}`);
      console.log("Delete Response:", response);
   
      setComments(comments?.filter((item) => item.id !== commentToDelete));
      toast.success("Comment successfully deleted");
   } catch (err: any) {
      console.error("Failed to delete comment:", err.response?.data || err);
      toast.error("Failed to delete comment, please try again");
   }finally {
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };


  
  const openDeleteModal = (commentId: number) => {
    setCommentToDelete(commentId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 border border-gray-300 dark:bg-black dark:border-[#6345ED] rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-white">
        Add your comment
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Post Comment Section */}
      <div className="mb-6 space-y-4">
        <textarea
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        {/* Rating Selector */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              className={`h-8 w-8 cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.328 2.197 10.673 2.197 10.951 2.927l1.287 3.634 3.815.005c.815 0 1.155 1.073.518 1.535l-3.053 2.22 1.177 3.724c.246.78-.659 1.414-1.335.94L10 13.07l-3.36 2.916c-.676.474-1.581-.16-1.335-.94l1.177-3.724-3.053-2.22c-.637-.462-.297-1.535.518-1.535l3.815-.005 1.287-3.634z" />
            </svg>
          ))}
        </div>

        <button
          onClick={handlePostComment}
          className="bg-custom-gradient text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>

      {/* Display Comments */}
      <div>
        <h1 className="font-bold text-xl pl-1 mb-1">People's Comments</h1>
        <div className="max-h-80 overflow-y-auto space-y-4 px-2 py-1 border border-gray-300 rounded-lg">
          {comments?.map((item) => {
            console.log("item.user_id:", item.user_id, "userId:", userId);
            return (
              // console.log("item.user_id:", item.user_id, "userId:", userId);
              <div
                key={item.id}
                className="dark:bg-black flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg px-4 pb-1 sm:space-x-4  sm:space-y-0"
              >
                {/* User Avatar */}
                <div className="w-16 h-16 aspect-square bg-gray-300 rounded-full flex justify-center items-center object-contain text-gray-500 text-sm">
                  <img
                    src={profileImageUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {/* {item?.users?.first_name} */}
                    {username}
                  </h3>
                  {item?.comments && (
                    <p className=" text-gray-600 text-sm leading-relaxed dark:text-[#616161]">
                      {item?.comments}
                    </p>
                  )}
                  {item.created_at && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  )}
                  {/* Show delete button only for user's own comments */}

                  {item.user_id === userId && (
                    <Button
                      danger
                      onClick={() => openDeleteModal(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  )}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        // onClick={() => setRating(star)}
                        className={`h-8 w-8 cursor-pointer ${
                          star <= item?.ratings
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927C9.328 2.197 10.673 2.197 10.951 2.927l1.287 3.634 3.815.005c.815 0 1.155 1.073.518 1.535l-3.053 2.22 1.177 3.724c.246.78-.659 1.414-1.335.94L10 13.07l-3.36 2.916c-.676.474-1.581-.16-1.335-.94l1.177-3.724-3.053-2.22c-.637-.462-.297-1.535.518-1.535l3.815-.005 1.287-3.634z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDeleteComment}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default CommentsSection;
