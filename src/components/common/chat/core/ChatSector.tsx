import React from 'react'
import ChatSideBar from '../utilComponents/ChatSideBar'
import MesageBar from './MesageBar'

const ChatSector = () => {
  return (
    <div className='w-[80%] mx-auto mt-2 flex'>
      <ChatSideBar/>
      <MesageBar/>

    </div>
  )
}

export default ChatSector
