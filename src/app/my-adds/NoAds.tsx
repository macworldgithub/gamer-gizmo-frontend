"use client";
import Image from "next/image";
import question from "../../../public/images/question.png";
import { useRouter } from "next/navigation";


export default function NoAds({}) {
  const router = useRouter();

  const handleClick =()=> {
    router.push('/publish-ad')
  }
  return (
    <>
      <div className="flex  bg-black text-white w-fit px-4 py-1 rounded-full mb-4 max-lg:mx-4">
        <span className="font-medium text-lg">All Ads (0)</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-400 mb-4">
          <Image src={question} alt="No ads" height={200} width={200} />
        </div>
        <p className="text-lg font-bold mb-4">You haven’t placed any ads yet</p>
        <button className="px-20 py-2 bg-custom-gradient text-white font-semibold rounded-lg" onClick={()=> handleClick()}>
          Post Your Ad
        </button>
      </div>
    </>
  );
}
