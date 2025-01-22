import React from 'react'
import ProfilePage from './profile';
import SideBar from './sidebar';
const page = () => {
  return (
    <>
    <div className='md:flex md:gap-12 lg:'>
    <SideBar/>
    <ProfilePage/>
    </div>
    </>
  )
}

export default page;
