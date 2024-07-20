import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import BlogsPage from '@/components/user/Blogs/BlogsPage'
import React from 'react'

const page = () => {
  return (
    <div>
            <NavBar/>
            <BlogsPage/>
            <Foooter/>
    </div>
  )
}

export default page