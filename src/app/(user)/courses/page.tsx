import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import AllCourses from '@/components/user/course/AllCourses'
import React from 'react'

const page = () => {
  return (
    <>
      <NavBar/>
      <AllCourses/>
      <Foooter/>
    </>
  )
}

export default page
