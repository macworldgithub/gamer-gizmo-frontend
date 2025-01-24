import React from 'react';
import ProfilePage from './profile';
import Sidebar from './sidebar';

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center md:gap-16 xl:gap-32 2xl:gap-40">
      <Sidebar />
      <ProfilePage />
    </div>
  );
};

export default Page;
