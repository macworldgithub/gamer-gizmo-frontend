"use client";
// pages/LiveCommunity.tsx
import React, { use, useState } from "react";
import CommunityCard from "../components/CommunityCard";
import Wrapper from "./Common/Wrapper/Wrapper";
import { useRouter } from "next/navigation";
import CreateCommunityButton from "@/app/community/CreateCommunity";
import CommunityList from "@/app/community/CommunityList";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const LiveCommunity: React.FC = () => {
  const router = useRouter();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const triggerRefresh = () => setRefreshFlag((prev) => !prev);
  const token = useSelector((state: any) => state.user.token);
  const handleJoinCommunity = () => {
    router.push("/community");
  };

  return (
    <div className="space-y-8  bg-white dark:bg-black w-full ">
      <Wrapper>
        {/* <h1 className="text-3xl text-start font-bold max-sm:text-xl  text-black dark:text-white max-sm:ml-4 md:pl-4 sm:pl-3 pb-3">
          Live Community comming soon
        </h1> */}

        {/* <CommunityCard /> */}
        <div className="flex flex-col gap-4  max-md:gap-2 ">
          {token && (
            <div className="flex justify-end mt-2 mr-2">
              <button
                className="bg-custom-gradient rounded-full w-10 h-10 max-lg:w-6 max-lg:h-6 hover:bg-purple-700 "
                onClick={() => router.push("/all-communities")}
              >
                <Image
                  src="/images/arrowRight.png"
                  alt="Right Arrow"
                  width={20}
                  height={25}
                  className="mx-auto max-lg:w-[10px] max-lg:h-[10px]"
                />
              </button>
            </div>
          )}

          <CommunityList refresh={refreshFlag} />
        </div>

        <div className="flex justify-end gap-4 max-md:justify-center max-md:mt-0 md:mt-3 mb-1">
          {/* <button
            onClick={handleJoinCommunity}
            className="px-6 py-2 w-[10rem] h-[3rem] bg-custom-gradient  text-white text-center text-xs font-semibold rounded-full shadow hover:opacity-90"
          >
            Join Live Community
          </button> */}

          {token && (
            <div>
              <CreateCommunityButton onCreated={triggerRefresh} />
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default LiveCommunity;
