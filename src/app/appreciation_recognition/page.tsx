import PageHeader from "@/components/PageHeader";
import React from "react";
import Image from "next/image";
import BuisnessInquiries from "@/components/BuisnessInquiries";
import BenefitsPage from "./BenefitsPage";

const page = () => {
  const cardContent = {
    title: "Not on GamerGizmo yet?",
    description:
      "Talk to us. We’ll show you how we can add value to your marketing ecosystem. There’s a reason hundreds of dealers in the UAE already trust us.",
    note: "",
  };

  return (
    <div className="dark:bg-black">
      <PageHeader
        pageName="Appreciation & Recognition"
        title="Maximize your usage to maximize your exposure."
        description="Grow your sales by appealing to up to 200,000 potential buyers who come to GamerGizmo every month to find their next car. Be among the best and promote your showroom on the UAE’s largest car marketplace.Be the next Showroom of the Month on GamerGizmo."
        button="learn more"
      />

      <BenefitsPage />

      <BuisnessInquiries cardContent={cardContent} />
    </div>
  );
};
export default page;
