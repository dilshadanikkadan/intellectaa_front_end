import { useUserStore } from "@/store/storeProviders/UseUserStore";
import React, { useContext, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardIcon from "@mui/icons-material/Forward";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { TOBE } from "@/types/constants/Tobe";

interface Props {
  msg: TOBE;
  setIsReply: TOBE;
  setForWardMessage: TOBE;
  currentChatMembersName: TOBE;
  messageRef: TOBE;
  cuurrentChatId: TOBE;
  onReply: (msg: TOBE) => void;
  onDelete: (msg: TOBE, forEveryone: boolean) => void;
  onForward: (msg: TOBE) => void;
}

const TextMessage = ({
  setForWardMessage,
  messageRef,
  msg,
  setIsReply,
  currentChatMembersName,
  cuurrentChatId,
  onReply,
  onDelete,
  onForward,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const isOwnMessage = user?._id === msg.senderId;
  const [isHovered, setIsHovered] = useState(false);
  const { socket, rooms } = useContext(SocketContext);
  const colors = {
    user1: "#007AFF",
    user2: "#4CAF50",
    user3: "#FA6533",
  };

  const userColor: TOBE = {};

  function getRandomValue(obj: TOBE) {
    const values = Object.values(obj);
    const roomMembers = currentChatMembersName.map(
      (user: TOBE) => user.username
    );
    for (let i = 0; i < roomMembers.length; i++) {
      userColor[roomMembers[i]] = values[i];
    }
  }

  getRandomValue(colors);
  const username_of_msg_holder = currentChatMembersName?.find(
    (user: TOBE) => user?._id === msg?.senderId
  )?.username;
  const queryClient = useQueryClient();
  const pinMessage = (id: TOBE, message: TOBE) => {
    socket?.emit("pin_message", {
      messageId: id,
      message,
      roomId: cuurrentChatId,
    });

    queryClient.invalidateQueries(["messages"] as TOBE);
  };
  return (
    <div
      ref={messageRef}
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      } mb-4 relative`}
    >
      <div
        className={`flex ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        } items-end max-w-[70%]`}
      >
        {!isOwnMessage && (
          <div
            style={{ backgroundColor: `${userColor[username_of_msg_holder]}` }}
            className={`w-8 h-8 rounded-full mr-2 self-start mb-1 flex items-center justify-center font-bold text-white`}
          >
            {username_of_msg_holder?.split("")[0]}
          </div>
        )}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative px-4 py-2 ${
            isOwnMessage
              ? "bg-[#20B486] text-white rounded-tl-2xl rounded-tr-md rounded-b-2xl rounded-bl-2xl"
              : "bg-white relative text-black rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
          }`}
          style={{ minWidth: "150px", minHeight: "40px", paddingRight: "55px" }}
        >
          {!isOwnMessage && (
            <p
              className={`text-[0.77rem] font-semibold line-clamp-1`}
              style={{ color: userColor[username_of_msg_holder] }}
            >
              {username_of_msg_holder}
            </p>
          )}
          <p className="break-words">{msg.message}</p>

          <Popover>
            <PopoverTrigger className="absolute top-0 right-0 bottom-0 left-0">
              <KeyboardArrowDownIcon
                style={{ display: isHovered ? "block" : "none" }}
                fontSize="inherit"
                className={`absolute ${
                  isOwnMessage ? "left-2" : "right-2"
                } top-1 text-[0.90rem] transition-all duration-700`}
              />
            </PopoverTrigger>
            <PopoverContent
              className={`w-48 ${isOwnMessage ? "left-0" : "right-0"}  `}
            >
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setIsReply({
                      message: msg?.message,
                      replyTo: username_of_msg_holder,
                    });
                  }}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                >
                  <ReplyIcon fontSize="small" />
                  <span>Reply</span>
                </button>

                <button
                  onClick={() => pinMessage(msg?._id, msg?.message)}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                >
                  <PushPinIcon fontSize="small" />
                  <span>Pin</span>
                </button>
                {isOwnMessage && (
                  <>
                    <button
                      onClick={() => onDelete(msg, false)}
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                    >
                      <DeleteIcon fontSize="small" />
                      <span>Delete for me</span>
                    </button>
                    <button
                      onClick={() => onDelete(msg, true)}
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                    >
                      <DeleteIcon fontSize="small" />
                      <span>Delete for everyone</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setForWardMessage(msg?.message);
                  }}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
                >
                  <ForwardIcon fontSize="small" />
                  <span>Forward</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>

          <p className="text-[0.75rem] absolute bottom-1 right-2">
            {moment(msg?.createdAt).format("HH:mm")}
            {isOwnMessage && (
              <DoneAllIcon
                fontSize="inherit"
                className={`${
                  msg?.read ? "text-[#34B7F1]" : "text-gray-500"
                }  text-[0.95rem] `}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextMessage;
