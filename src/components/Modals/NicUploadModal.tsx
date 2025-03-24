"use client";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { toast } from "react-toastify";

const NicUploadModal = ({
  openNicModal,
  setOpenNicModal,
  setRefetch,
  refetch,
}: any) => {
  const [nicFront, setNicFront] = React.useState<File | null>(null);
  const [nicBack, setNicBack] = React.useState<File | null>(null);
  const token = useSelector((state: RootState) => state.user.token);

  const handleNicUpload = async (nicFront: File, nicBack: File) => {
    const formData = new FormData();
    formData.append("nic_front_image", nicFront);
    formData.append("nic_back_image", nicBack);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/applyForVerification`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Emirates Id images uploaded successfully!");
      setRefetch(!refetch);
    } catch (error: any) {
      console.error("Upload error:", error);

      // Extract meaningful error messages from the backend
      let errorMessage =
        "Failed to upload Emirates ID images. Please try again.";

      if (error.response) {
        // If backend sends an error response
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        // Request made but no response received
        errorMessage = "No response from server. Please check your network.";
      } else {
        // Something else went wrong
        errorMessage = error.message;
      }

      toast.error(errorMessage); // Show error message in toast
    }
  };

  const handleSubmit = () => {
    if (nicFront && nicBack) {
      handleNicUpload(nicFront, nicBack);
      setOpenNicModal(false);
    } else {
      alert("Please upload both images.");
    }
  };

  if (!openNicModal) return null;

  return (
    <div className="fixed inset-0 bg-black text-black  bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md dark:bg-[#1e1e2f] ">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Upload Emirates ID Images
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1 dark:text-white">
              Emirates ID Front Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNicFront(e.target.files ? e.target.files[0] : null)
              }
              className="block w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 dark:text-white">
              Emirates ID Back Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNicBack(e.target.files ? e.target.files[0] : null)
              }
              className="block w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpenNicModal(false)}
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

export default NicUploadModal;
