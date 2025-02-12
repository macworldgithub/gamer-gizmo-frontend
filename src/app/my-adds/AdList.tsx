"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Store/Store";
import CustomLoader from "@/components/CustomLoader";

export default function AdList({
  ads,
  setFetch,
  fetcher,
  total,
  currentPage,
  setCurrentPage,
}: any) {
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    setFetch(!fetcher);
  }, [currentPage]);

  const deleteProduct = async (id: any) => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/deleteProductById?product_id=${id}&user_id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setFetch(!fetcher);
      toast.success("Successfully Deleted");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to delete the product");
    }
  };

  const openModal = (ad: any) => {
    setSelectedAd(ad);
    setModalOpen(true);
  };

  const updateStatus = async () => {
    if (!selectedAd) return;
    try {
      setLoading(true);
      const newStatus = !selectedAd.active;
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/invertStatus`,
        {
          product_id: selectedAd.id.toString(),
          // @ts-expect-error kjhk j,h
          user_id: userId.toString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      toast.success(`Status changed to ${newStatus ? "Active" : "Draft"}`);
      setFetch(!fetcher);
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="m-4">
      <div className="flex justify-between items-center bg-black text-white w-fit px-4 py-1 rounded-full mb-4">
        <span className="font-medium text-lg">All Ads ({total})</span>
      </div>

      {ads.map((ad: any) => (
        <div
          key={ad.id}
          className="flex flex-col shadow-lg lg:flex-row items-center rounded-lg p-8 lg:p-6 mb-6"
        >
          <div className="w-28 h-28">
            <Image
              width={100}
              height={100}
              src={
                ad?.images &&
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/${ad?.images[0].image_url}`
              }
              alt={"image"}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex-1 px-0 lg:px-6">
            <h3 className="font-bold text-purple-700 max-md:text-[12px] leading-6 break-words">
              {ad?.category}
            </h3>
            <h3 className="font-bold text-lg max-md:text-[12px] leading-6 break-words">
              {ad?.name}
            </h3>
            <h3 className="text-sm max-md:text-[12px] leading-6 break-words">
              {ad?.description?.slice(0, 120)} ...
            </h3>
            <div className="flex flex-wrap items-center text-gray-500 text-sm space-x-4 mt-2">
              <span className="font-bold text-purple-600 mt-2 lg:mt-0">
                AED <span className="text-2xl">{ad.price}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full lg:w-auto gap-12 mt-4">
            <div
              className={`px-4 py-1 text-sm font-medium rounded-full cursor-pointer ${
                ad.active ? "bg-blue-500 text-white" : "bg-black text-white"
              }`}
              onClick={() => openModal(ad)}
            >
              {ad.active ? "Active" : "Draft"}
            </div>
            <div className="flex flex-row lg:flex-col gap-2">
              <button className="px-4 lg:px-6 border border-black font-bold rounded-full hover:bg-gray-200">
                Edit
              </button>
              <button
                onClick={() => deleteProduct(ad.id)}
                className="px-4 lg:px-6 text-[#ff0000] border border-[#ff0000] font-bold rounded-full hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
          {loading && <CustomLoader />}
        </div>
      ))}

      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {modalOpen && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Status</h2>
            <p>
              Are you sure you want to change the status to{" "}
              <span className="font-bold">
                {selectedAd.active ? "Draft" : "Active"}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
