"use client"
import React, { useState } from 'react'
import ChatSideBar from '../utilComponents/ChatSideBar'
import MesageBar from './MesageBar'

const ChatSector = () => {
  const [cuurrentChat,setCurrentChat]= useState(null)
  return (
    <div className='w-[80%] mx-auto mt-2 md:flex'>
      <ChatSideBar setCurrentChat={setCurrentChat} cuurrentChat={cuurrentChat}/>
      <MesageBar cuurrentChatId={cuurrentChat}/>

    </div>
  )
}

export default ChatSector
