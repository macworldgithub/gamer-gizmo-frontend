import React from "react";
import Image from "next/image";

const RulesOfUploading = () => {
  return (
    <div className="w-[100%]  text-[8px] h-max py-5 px-10 flex justify-center  max-sm:flex-col max-sm:pl-[20%]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 h-max w-[80%] items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p>
            <span className="font-bold">
              Adding at least 8 pictures & 2 videos
            </span>{" "}
            improves the chances for a quick sale
          </p>
        </div>
        <div className="flex gap-1 h-max w-[80%] items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p>
            <span className="font-bold">Photos should be in</span> ‘jpeg, jpg,
            png, gif’ format only
          </p>
        </div>
        <div className="flex gap-1 h-max w-[80%]  items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p className=" font-bold">
            <span className="font-bold">Video should be in</span> ‘MP4’ format
            only
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex  gap-1 h-max w-[80%]   items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p className=" ">
            <span className="font-bold">Adding clear Front, Back</span> of your
            PC increases the quality of your Ad and gets you noticed more
          </p>
        </div>
        <div className="flex gap-1 h-max w-[80%]  items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p>
            <span className="font-bold">Pictures should be</span> 800x600 center
            frame image.
          </p>
        </div>
        <div className="flex gap-1 h-maxw-[80%]   items-center">
          <Image
            src={"/images/CheckBroken.png"}
            width={25}
            height={25}
            alt="tick"
          />
          <p>
            <span className="font-bold">Video should be </span> 800x600 center
            frame video.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RulesOfUploading;
