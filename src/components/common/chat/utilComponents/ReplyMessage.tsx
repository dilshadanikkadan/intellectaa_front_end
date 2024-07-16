import { useUserStore } from "@/store/storeProviders/UseUserStore";
import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
interface Props {
  msg: any;
  currentChatMembers: any;
  currentChatMembersName: any;
}

const ReplyMessage = ({
  msg,
  currentChatMembers,
  currentChatMembersName,
}: Props) => {
  const user = useUserStore((state) => state.user);
  const isOwnMessage = user?._id === msg.senderId;

  const colors = {
    user1: "#007AFF",
    user2: "#4CAF50",
    user3: "#FA6533",
  };

  const userColor: any = {};

  function getRandomValue(obj: any) {
    const values = Object.values(obj);
    const roomMembers = currentChatMembersName.map(
      (user: any) => user.username
    );
    for (let i = 0; i < roomMembers.length; i++) {
      userColor[roomMembers[i]] = values[i];
    }
  }

  getRandomValue(colors);
  const username_of_msg_holder = currentChatMembersName?.find(
    (user: any) => user?._id === msg?.senderId
  )?.username;
  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
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
          className={`relative  ${
            isOwnMessage
              ? "bg-[#20B486] text-white rounded-tl-2xl rounded-tr-md rounded-b-2xl rounded-bl-2xl"
              : "bg-white text-black rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
          }`}
          style={{
            minWidth: "150px",
            minHeight: "40px",
            padding: "5px",
            paddingBottom: "0px",
          }}
        >
          {!isOwnMessage && (
            <p
              className={`text-[0.77rem] ml-2 font-semibold line-clamp-1`}
              style={{ color: userColor[username_of_msg_holder] }}
            >
              {username_of_msg_holder}
            </p>
          )}
          <div
            style={{
              border: `border-none `,
              borderLeft: ` solid 3px ${!isOwnMessage ? userColor[username_of_msg_holder] : "white"}`,
            }}
            className={` Px-2 ${
              isOwnMessage
                ? "bg-[#5cdab0] border-white border-l-2"
                : `bg-gray-200 border-r-2 `
            } py-1 rounded-md border-white`}
          >
            <p className="px-2 line-clamp-1 font-bold text-[0.75rem] py-1 rounded-md object-cover">
              {msg?.replyTo === user?.username ? "me" : msg?.replyTo}
            </p>
            <p className="pl-2 text-[0.75rem] rounded-md object-cover">
              {msg?.replyMessage}
            </p>
          </div>
          <p className=" rounded-md object-cover ml-2">{msg?.message}</p>
          <p className="py-2 pl-1">{msg?.description}</p>
          <p className="text-[0.75rem] absolute bottom-1 right-2">
            2:30{" "}
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

export default ReplyMessage;
