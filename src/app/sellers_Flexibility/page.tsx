import PageHeader from '@/components/PageHeader'
import React from 'react'
import BuisnessInquiries from "@/components/BuisnessInquiries";
import Package from './Package';
import Card from './Card';
import AdFeatures from './Adfeature';
import Monthlycredit from './Monthlycredit'
import Heading from './Heading';

const page = () => {

  const cardContent = {
    title: "Are you ready?",
    description:
      "Fill in this form and one of our team members we’ll get in touch very soon. We’ll give you some details over the phone or, better yet, set up a meeting with you at your showroom.",
    note: ""
  };

  return (
    <div className='dark:bg-black'>
      <PageHeader
        pageName='sellers felxibility'
        title='Get the Reach You Need, the Impact You Want.'
        description='GamerGizmo is your partner in success, helping you connect with thousands of gamers looking for the latest PCs, laptops, and gaming gear. Boost your visibility, attract the right buyers, and drive your sales to the next level with ease. Showcase your gaming inventory on GamerGizmo today – let’s power your success!'
        button='learn more' />
      <Card />
      <Package />
      <AdFeatures />
      <Monthlycredit />
      <Heading />
      <BuisnessInquiries cardContent={cardContent} />
    </div>
  )
}
export default page;
