import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import ProblemPage from '@/components/user/ProblemPgae/core/ProblemPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <NavBar/>
        <ProblemPage/>
        <Foooter/>
    </div>
  )
}

export default page