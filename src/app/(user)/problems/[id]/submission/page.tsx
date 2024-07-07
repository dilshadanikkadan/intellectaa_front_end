import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import Submission from '@/components/user/submission/Submission'
import React from 'react'

const page = () => {
  return (
    <div>
        <NavBar/>
        <Submission/>
        <Foooter/>
    </div>
  )
}

export default page