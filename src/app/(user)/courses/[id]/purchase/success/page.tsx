import Foooter from '@/components/common/Foooter'
import NavBar from '@/components/common/NavBar'
import PaymentSuccess from '@/components/user/course/paymentSuccess/PaymentSuccess'
import React from 'react'

const page = () => {
  return (
    <div>
        <NavBar/>
        <PaymentSuccess/>
        <Foooter/>
    </div>
  )
}

export default page