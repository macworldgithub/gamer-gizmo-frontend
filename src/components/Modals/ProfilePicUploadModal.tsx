"use client";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { toast } from "react-toastify";

const ProfilePicUploadModal = ({
  openProfileModal,
  setOpenProfileModal,
  setRefetch,
  refetch,
}: any) => {
  const [profile, setProfile] = React.useState<File | null>(null);
  const token = useSelector((state: RootState) => state.user.token);

  const handleSubmit = async () => {
    if (profile) {
      const formData = new FormData();
      formData.append("profile", profile);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/updateProfilePicture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Profile Picture Changed successfully!");
        setRefetch(!refetch);
        setTimeout(() => {
          setOpenProfileModal(false);
        }, 1000);
      } catch (error) {
        alert("Failed to upload Profile. Please try again.");
      }
    } else {
      alert("Please upload both images.");
    }
  };

  if (!openProfileModal) return null;

  return (
    <div className="fixed inset-0 bg-black text-black  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Upload Profile Images</h2>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfile(e.target.files ? e.target.files[0] : null)
              }
              className="block w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpenProfileModal(false)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicUploadModal;
