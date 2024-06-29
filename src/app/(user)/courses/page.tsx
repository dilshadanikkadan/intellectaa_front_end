import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import AllCourses from '@/components/user/course/AllCourses'
import CourseBreadC from '@/components/user/course/CourseBreadC'
import React from 'react'

const page = () => {
  return (
    <>
      <NavBar/>
      <CourseBreadC/>
      <AllCourses/>
      <Foooter/>
    </>
  )
}

export default page
