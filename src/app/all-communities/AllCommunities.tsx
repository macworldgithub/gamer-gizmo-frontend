// app/all-communities/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

export default function AllCommunities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/list?limit=100`, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommunities(res.data.data);
      } catch (err) {
        console.error("Failed to fetch communities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [token]);

  return (
    <Wrapper>
      <div className="p-4 dark:bg-secondaryBlack rounded-lg">
        <h1 className="text-2xl font-bold mb-6 dark:text-white text-black">
          All Communities
        </h1>

        {!token ? (
          <div className="flex justify-center mb-6  ">
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-custom-gradient text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Image
                src="/images/send.svg"
                width={20}
                height={20}
                alt="Login Icon"
              />
              Login to Join Communities
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">
              Loading.. .
            </p>
          ) : communities.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No communities found.
            </p>
          ) : (
            communities.map((community: any) => {
              const profilePicture = community.creator?.profile_picture;
              const latestMsg = community.latest_message;

              return (
                <div
                  key={community.id}
                  // onClick={() => router.push(`/community-chat/${community.id}`)}
                  onClick={() =>
                    router.push(
                      `/community-chat/${
                        community.id
                      }?name=${encodeURIComponent(community.name)}`
                    )
                  }
                  className="border border-purple-300 rounded-lg p-4 overflow-hidden shadow-md dark:bg-zinc-800 bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out hover:cursor-pointer dark:hover:bg-zinc-700 hover:bg-purple-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      {profilePicture ? (
                        <Image
                          src={profilePicture}
                          width={40}
                          height={40}
                          alt="creator-pic"
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <FaRegUserCircle className="text-4xl text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold dark:text-white text-black text-base">
                        {community.creator?.username}
                      </p>
                      {latestMsg?.created_at && (
                        <p className="text-xs text-gray-500">
                          {format(
                            new Date(latestMsg.created_at),
                            "hh:mm a, MMM dd"
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-4 text-black text-base font-semibold dark:text-white">
                    {community.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-300 line-clamp-3">
                    {community.description || "No description provided."}
                  </p>

                  {latestMsg && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Latest Message:
                      </p>
                      <p className="text-sm dark:text-white text-black mt-1 line-clamp-2">
                        {latestMsg.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </Wrapper>
  );
}
