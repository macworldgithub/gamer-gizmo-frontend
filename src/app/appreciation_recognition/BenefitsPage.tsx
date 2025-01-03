import React from 'react';

export default function BenefitsPage() {
  return (
    <div className="bg-white text-gray-800 dark:bg-black dark:text-white">
      <div className="container mx-auto px-8 lg:px-16 py-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Exclusive access to benefits for high performers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white lg:pr-20 lg:pl-20">
            We reward showrooms who make the best out of their GamerGizmo experience; maintain a high standard of listings; and provide an excellent customer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-14">
          <div className="flex flex-col gap-4 lg:gap-6 lg:pr-12 lg:pl-8 lg:py-6">
            <h2 className="text-xl md:text-2xl font-bold">
              Impactful branding for instant recognition
            </h2>
            <p className="text-gray-600 dark:text-white">
              Stand out from the crowd with distinctive "Showroom of the Month" branding for 30 days. PCs buyers searching for their next car on GamerGizmo will instantly recognize high-performing dealers while browsing showrooms on GamerGizmo, as well as any of their live listings.
            </p>
          </div>
          <div className="flex justify-center lg:pr-16">
            <img
              src="/images/laptop.png"
              alt="Showroom branding preview"
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex justify-center lg:pr-6 lg:pl-8">
            <img
              src="/images/Social.png"
              alt="Social media"
              className="w-full max-w-xs rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col gap-4 lg:gap-6 lg:pr-14">
            <h2 className="text-xl md:text-2xl font-bold">
              Extra reach and exposure
            </h2>
            <p className="text-gray-600 dark:text-white">
              Every month, four lucky winners will be announced through our active social media channels and email marketing to an audience of up to 1 million people in the UAE.
            </p>
          </div>
        </div>

        <div className="text-center mt-10 py-14 pb-0 ">
          <p className="text-xl md:text-2xl lg:text-4xl font-semibold text-[#000000] dark:text-white ">
            Want to be next? Ask your account manager for tips.
          </p>
        </div>
      </div>
    </div>
  );
}
