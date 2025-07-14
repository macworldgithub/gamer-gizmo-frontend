import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function CommunityList({ refresh }: { refresh: boolean }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.user.token);
  const router = useRouter();
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!token) return; // Skip fetch if not logged in
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/community/list?limit=4`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCommunities(response.data.data);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [refresh, token]);

  // ✨ If user is not logged in
  if (!token) {
    return (
      <div className="w-full max-md:w-80 max-md:px-6 text-center p-6 mt-2 bg-purple-50 rounded-lg border border-dashed border-purple-300">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">
          Join the Conversation!
        </h2>
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-custom-gradient text-white px-6 py-3 mx-auto rounded-full text-sm sm:text-base font-semibold shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
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
    );
  }

  // ✨ If logged in, render actual community list
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {loading ? (
        <p className="col-span-full text-center text-gray-500">Loading...</p>
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
              // onClick={() =>
              //   router.push(
              //     `/community-chat/${community.id}?name=${encodeURIComponent(
              //       community.name
              //     )}`
              //   )
              // }
              onClick={() => {
                setSelectedCommunity(community);
                setShowModal(true);
              }}
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
              {/* 
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300 line-clamp-3">
                {community.description ||
                  "Get involved — your thoughts matter!"}
              </p> */}

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
      {/* {showModal && selectedCommunity && (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 w-[60%] max-sm:w-[80%] max-w-md">
            <h2 className="text-xl font-bold mb-2 text-purple-700 dark:text-white">
              {selectedCommunity.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedCommunity.description || "No description provided."}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Created by: {selectedCommunity.creator?.username}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-bluishBorder text-white hover:text-purple-500 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(
                    `/community-chat/${
                      selectedCommunity.id
                    }?name=${encodeURIComponent(
                      selectedCommunity.name
                    )}&description=${encodeURIComponent(
                      selectedCommunity.description || ""
                    )}`
                  );
                }}
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showModal && selectedCommunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 w-[60%] max-sm:w-[80%] max-w-md">
            <h2 className="text-xl font-bold mb-2 text-purple-700 dark:text-white">
              {selectedCommunity.name}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedCommunity.description || "No description provided."}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Created by: {selectedCommunity.creator?.username}
            </p>

            {/* ✅ Scrollable Policies Section */}
            <div className="mb-4 max-h-[250px] overflow-y-auto pr-2">
              <h3 className="font-bold text-secondaryColorDark mb-2">
                Gamergizmo Community Chat Terms of Use
              </h3>
              <ol className="list-decimal pl-4 space-y-3 text-sm text-gray-800 dark:text-gray-300 text-left">
                <li>
                  <strong>Purpose of the Community:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Share insights on gaming PCs and accessories.</li>
                    <li>Discuss newly released games and technologies.</li>
                    <li>Stay updated on gaming news and trends.</li>
                    <li>Connect respectfully with fellow gamers.</li>
                  </ul>
                </li>

                <li>
                  <strong>Code of Conduct:</strong>
                  <p className="mt-1">
                    All users must behave responsibly and respectfully. The
                    following are strictly prohibited:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <strong>Abusive Language & Hate Speech:</strong> Use of
                      offensive, obscene, or abusive language, including
                      personal insults, racial slurs, or hate speech of any
                      kind.
                    </li>
                    <li>
                      <strong>Defamation & Personal Attacks:</strong> Do not
                      post content that defames, shames, or personally attacks
                      other users, companies, or individuals (public or
                      private).
                    </li>
                    <li>
                      <strong>Piracy & Illegal Content:</strong> Sharing links
                      to pirated software, games, cracks, or unauthorized
                      content is strictly forbidden.
                    </li>
                    <li>
                      <strong>Cyberbullying or Harassment:</strong> Harassing,
                      stalking, or targeting users in a way that causes distress
                      or fear is a violation of these terms and UAE Federal Law
                      No. 5 of 2012 (Cybercrime Law).
                    </li>
                    <li>
                      <strong>Promotion of Illegal Activities:</strong> Any
                      encouragement, promotion, or discussion of unlawful
                      actions under UAE law — including hacking, identity theft,
                      or bypassing game protections — is prohibited.
                    </li>
                    <li>
                      <strong>Violations of UAE Law:</strong> Content that
                      violates UAE laws on cybercrime, content standards,
                      defamation, or public decency will be reported and may
                      lead to criminal proceedings.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Accountability:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      All messages are logged and monitored for safety and
                      compliance.
                    </li>
                    <li>
                      Gamergizmo reserves the right to suspend or permanently
                      ban users who violate these terms.
                    </li>
                    <li>
                      Users are solely responsible for their statements and
                      content posted.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>No Commercial Spam or Self-Promotion:</strong>
                  <p className="mt-1">
                    Please do not use the chat rooms for commercial promotion,
                    affiliate links, or unauthorized advertising unless
                    explicitly permitted by Gamergizmo admins.
                  </p>
                </li>

                <li>
                  <strong>Content Moderation:</strong>
                  <p className="mt-1">
                    Moderators may delete or edit content that violates these
                    terms. Repeated violations may result in account suspension
                    or termination.
                  </p>
                </li>

                <li>
                  <strong>Agreement:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>You have read and understood these Terms of Use.</li>
                    <li>
                      You agree to follow all guidelines and UAE laws applicable
                      to online conduct.
                    </li>
                    <li>
                      You understand that your account may be suspended or
                      terminated if you breach these terms.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* ✅ Agree Checkbox */}
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-sm text-gray-800 dark:text-gray-300">
                  I have read and agree to the Terms of Use
                </span>
              </label>
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-bluishBorder text-white hover:text-purple-500 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push(
                    `/community-chat/${
                      selectedCommunity.id
                    }?name=${encodeURIComponent(
                      selectedCommunity.name
                    )}&description=${encodeURIComponent(
                      selectedCommunity.description || ""
                    )}`
                  );
                }}
                disabled={!agreed}
                className={`px-4 py-2 rounded text-white text-sm ${
                  agreed
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
