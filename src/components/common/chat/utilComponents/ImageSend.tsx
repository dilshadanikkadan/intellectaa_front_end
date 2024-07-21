"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sendNewMessageHelper } from "@/helpers/chat/chatApiHelper";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
interface Props {
  image: TOBE;
  setMessages: TOBE;
  setImage: TOBE;
  cuurrentChatId: TOBE;
  imageFile: TOBE;
  setLoading: TOBE;
}
const ImageSend = ({
  image,
  setMessages,
  setImage,
  cuurrentChatId,
  imageFile,
  setLoading
}: Props) => {
  const user = useUserStore((state) => state.user);
  console.log("my image", image);
  const queryClient = useQueryClient();
  const [progress, setprogressImg] = useState<TOBE>();
  const [description,setDescription] = useState<string>("")
  const { socket, rooms } = useContext(SocketContext);
  
  const { mutate: newMessageMutate } = useMutation({
    mutationFn: sendNewMessageHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages"] as TOBE);
    },
  });
  const handleSend = async () => {
    setLoading(true)
    const uploadedImage = await UseCloudinaryImage(imageFile, setprogressImg);
    const isActiveRoom = rooms[cuurrentChatId]?.length > 1;
    newMessageMutate({
      roomId: cuurrentChatId,
      senderId: user?._id,
      message: uploadedImage,
      typeMessage: "image",
      read: isActiveRoom ? true : false,
      description
    });
    socket?.emit("send_msg", {
      roomId: cuurrentChatId,
      message: uploadedImage,
      typeMessage: "image",
      senderId: user?._id,
      description
    });
    setImage("");
    setLoading(false)
  };

  return (
    <div className="h-full overflow-hidden   absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
      <Card className=" min-h-72 pb-3 w-[27rem]">
        <div className="wrapper w-[90%] h-full mx-auto flex flex-col gap-3">
          <img
            src={image}
            alt=""
            className="w-full h-[70%] mt-5 object-cover"
          />
          <Input onChange={(e)=> setDescription(e.target.value)} placeholder="Type here" className="" />
          <button
            onClick={handleSend}
            className="py-1.5 px-4 rounded-md bg-[#20B486] text-white"
          >
            Send
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ImageSend;
