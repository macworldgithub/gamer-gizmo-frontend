import BuisnessInquiries from "@/components/BuisnessInquiries";
import PageHeader from '@/components/PageHeader';
import Card from './card';
import MediaPack from './media';
import Stats from './stats';
const page = () => {
  
    const cardContent = {
      title: "Advertise on dubizzle",
      description:
        "Access up to 4 million unique monthly users and 312 million impressions.Reach out to us via the form",
        note:""
      };
  
  return (
    <>
      <div>
        <PageHeader
         pageName='advertiser'
         title='Unlock your marketing objectives'
         description='Reach the largest in-market audience in the UAE'
         button=  'Book your campaign now!' />
      </div>

      <div className="bg-gray-50 text-gray-800 px-4">
        {/* Header Section */}
        <section className="py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Why dubizzle advertising?</h1>
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-8"></div>
         
        </section>
        <Card/>
        <MediaPack/>
        <Stats/>
       <BuisnessInquiries cardContent={cardContent} />

      </div>
      
    </>
  )
}
export default page;
