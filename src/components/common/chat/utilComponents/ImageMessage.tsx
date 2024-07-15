import { useUserStore } from "@/store/storeProviders/UseUserStore";
import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
interface Props {
  msg: any;
}

const ImageMessage = ({ msg }: Props) => {
  const user = useUserStore((state) => state.user);
  const isOwnMessage = user?._id === msg.senderId;
 
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
          <img
            src="/avt.png"
            alt="User avatar"
            className="w-8 h-8 rounded-full mr-2 self-start mb-1"
          />
        )}
        <div
          className={`relative  ${
            isOwnMessage
              ? "bg-[#20B486] text-white rounded-tl-2xl rounded-tr-md rounded-b-2xl rounded-bl-2xl"
              : "bg-gray-200 text-black rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
          }`}
          style={{ minWidth: "150px", minHeight: "40px", padding: "5px",  paddingBottom: "0px" }}
        >
          <img src={msg?.message} className="h-44 rounded-md object-cover" alt="" />
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

export default ImageMessage;
