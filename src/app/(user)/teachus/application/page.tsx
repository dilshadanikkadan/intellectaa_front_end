import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import InstrunctorForm from '@/components/instructor/applicationForm/InstrunctorForm'
import React from 'react'

const page = () => {
  return (
    <div>
       <NavBar/> 
       <InstrunctorForm/>
       <Foooter/> 
    </div>
  )
}

export default page