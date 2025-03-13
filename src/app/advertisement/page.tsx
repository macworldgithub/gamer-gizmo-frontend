import React from 'react'
import DownloadApp from '../advertising/sellersvisibility/Download_app'
import StatsCards from '../advertising/StatsCards'
import ServiceCards from '../advertiser/card'
import FeaturesSection from '@/components/FeaturesSection'
import BuisnessInquiries from '@/components/BuisnessInquiries'

const page = () => {
    const cardContent = {
        title: "Not on GamerGizmo yet?",
        description:
          "Talk to us. We’ll show you how we can add value to your marketing ecosystem. There’s a reason hundreds of dealers in the UAE already trust us.",
          note:""
        };
    

    const features = [
        {
          icon: "/images/chartline.png",
          title: "Highly Target Audience",
          description:
            "Market directly to gamers & tech buyers",
        },
        {
          icon: "/images/database.png",
          title: "Maximum Visibility",
          description:
            "Get featured on high-traffic pages .",
        },
        {
          icon: "/images/listings.png",
          title: "Affordable and Effective",
          description:
            "Choose from budget-friendly ad packages",
        },
      ];

    return (
        <div>
            <FeaturesSection 
             features={features}
             title="Manage your PC shop on the go!"
            //  showButton={false}
            
            />
            <DownloadApp />
            <BuisnessInquiries cardContent={cardContent} />
            
        </div>
    )
}

export default page
