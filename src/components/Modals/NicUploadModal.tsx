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
      toast.success("NIC images uploaded successfully!");
      setRefetch(!refetch);
    } catch (error) {
      alert("Failed to upload NIC images. Please try again.");
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
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Upload NIC Images</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">NIC Front Image</label>
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
            <label className="block font-medium mb-1">NIC Back Image</label>
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
