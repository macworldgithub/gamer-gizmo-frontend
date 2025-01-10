import React from "react";
import PageHeader from "@/components/PageHeader";
import EclusivePage from "./EclusivePage";
import BuisnessInquiries from "@/components/BuisnessInquiries";
import ExclusiveCards from "./ExclusiveCards";

const page = () => {
  const cardContent = {
    title: "Advertise on dubizzle",
    description:
      "Access up to 4 million unique monthly users and 312 million impressions.Reach out to us via the form",
    note: "",
  };

  return (
  <div className="dark:bg-black">
      <div>
        <PageHeader
          pageName="advertiser"
          title="Reach the right audience"
          description="Customized targeting available with precision and scale"
          button="Book your campaign now!"
        />
        <EclusivePage />
        <ExclusiveCards />
        <BuisnessInquiries cardContent={cardContent} />
      </div>
    </div>
  );
};

export default page;
