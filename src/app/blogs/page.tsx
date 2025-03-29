import React from "react";
import UsBlogs from "./UsBlogs";
import PageHeader from "@/components/PageHeader";

import ItemCard from "./ItemCard";
import LiveAdSection from "@/components/LiveAd";
import GetStartedBadge from "@/components/GetStartedBadge";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

const page = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
      <PageHeader pageName={"Blogs"} title="Blogs" />
      <Wrapper className="flex w-full mt-4 gap-3">
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40 " />
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40" />
      </Wrapper>

      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row  gap-6   ">
        {/* Left Section (UsBlogs) */}
        <div className="w-full md:w-2/3">
          <UsBlogs />
        </div>

        {/* Right Section (ItemCard) */}
        <div className="w-full md:w-1/3 mt-20">
          <ItemCard />
        </div>
      </div>
      <div className="flex mx-6 w-full gap-2">
        <LiveAdSection className="w-[46%] md:h-52 max-md:h-40 " />
        <LiveAdSection className="w-[48%] md:h-52 max-md:h-40" />
      </div>
      <div className="mt-12 mx-4">
        <GetStartedBadge />
      </div>
    </div>
  );
};

export default page;

// import React from "react";
// import UsBlogs from "./UsBlogs";
// import PageHeader from "@/components/PageHeader";
// import ItemCard from "./ItemCard";

// const Page = () => {
//   return (
//     <div className="w-full bg-white dark:bg-black">
//       <PageHeader pageName={"Blogs"} title="Blogs" />
//       <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
//         {/* Left Section (UsBlogs) */}
//         <div className="w-full lg:w-2/3">
//           <UsBlogs />
//         </div>

//         {/* Right Section (ItemCard) */}
//         <div className="w-full lg:w-1/3 mt-4 ">
//           <ItemCard />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
