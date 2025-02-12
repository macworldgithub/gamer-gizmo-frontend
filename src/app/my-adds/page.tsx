"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import NoAds from "./NoAds";
import AdList from "./AdList";
import { RootState } from "@/components/Store/Store";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import CustomLoader from "@/components/CustomLoader";
export default function Add() {
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.id);

  const [fetcher, setFetch] = useState(false);
  useLayoutEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const [ads, setAds] = useState([]);
  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getUserProducts?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      console.log(response.data.data, "pak");
      setAds(response.data.data);
    } catch (err) {
      setLoading(false);

      toast.error("Failed to add to favourites");
    }
  };
  useEffect(() => {
    fetch();
  }, [fetcher]);
  console.log(ads, "adsadsadsads");
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 max-lg:mx-4">My Ads</h2>
        {ads.length === 0 ? (
          <NoAds />
        ) : (
          <AdList setFetch={setFetch} fetcher={fetcher} ads={ads} />
        )}
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}
