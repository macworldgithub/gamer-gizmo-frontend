"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { toast } from "react-toastify";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const fetch = async () => {
    try {
      let res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email/logoutConfirmation?token=${token}`
      );
      if (res.status == 200) {
        toast.success("SuccessFully Logout");
      } else {
        toast.error("Failed to Logout");
      }
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      toast.error("Failed to Logout");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  };
  useLayoutEffect(() => {
    fetch();
  }, []);
  return <div>Logging Out</div>;
};

export default page;
