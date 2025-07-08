// // components/chat/BannedUsersModal.tsx
// import React from "react";
// import Image from "next/image";
// import { FaRegUserCircle } from "react-icons/fa";

// interface BannedUser {
//   id: number;
//   username: string;
//   profile_picture: string | null;
// }

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   users: BannedUser[];
// }

// const BannedUsersModal: React.FC<Props> = ({ isOpen, onClose, users }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
//           🚫 Banned Users
//         </h2>
//         <ul className="space-y-2">
//           {users.length > 0 ? (
//             users.map((user) => (
//               <li
//                 key={user.id}
//                 className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-700 p-2 rounded-md"
//               >
//                 {user.profile_picture ? (
//                   <Image
//                     src={user.profile_picture}
//                     alt={user.username}
//                     width={32}
//                     height={32}
//                     className="rounded-full"
//                   />
//                 ) : (
//                   <FaRegUserCircle className="text-2xl text-gray-500 dark:text-gray-300" />
//                 )}
//                 <span className="text-sm text-gray-800 dark:text-white">
//                   {user.username}
//                 </span>
//               </li>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               No banned users found.
//             </p>
//           )}
//         </ul>
//         <button
//           onClick={onClose}
//           className="mt-4 w-full text-sm bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BannedUsersModal;
// components/chat/BannedUsersModal.tsx
import React from "react";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

interface BannedUser {
  id: number;
  username: string;
  profile_picture: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: BannedUser[];
  communityChatId: number;
  token: string;
  onUnban: (userId: number) => void; // To update parent list
}

const BannedUsersModal: React.FC<Props> = ({
  isOpen,
  onClose,
  users,
  communityChatId,
  token,
  onUnban,
}) => {
  if (!isOpen) return null;

  const unbanUser = async (userId: number) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/unban-user/${communityChatId}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUnban(userId); // Remove from UI
    } catch (error) {
      console.error("Failed to unban user:", error);
      alert("Something went wrong while unbanning the user.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-80 max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          🚫 Banned Users
        </h2>

        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-3 bg-gray-100 dark:bg-zinc-700 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {user.profile_picture ? (
                    <Image
                      src={user.profile_picture}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <FaRegUserCircle className="text-2xl text-gray-500 dark:text-gray-300" />
                  )}
                  <span className="text-sm text-gray-800 dark:text-white">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={() => unbanUser(user.id)}
                  className="text-xs text-red-600 hover:underline hover:text-red-800"
                >
                  Unban
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No banned users found.
            </p>
          )}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BannedUsersModal;
