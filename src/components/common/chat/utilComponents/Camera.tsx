"use client";
import { Card } from "@/components/ui/card";
import { sendNewMessageHelper } from "@/helpers/chat/chatApiHelper";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { TOBE } from "@/types/constants/Tobe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import WebCam from "react-webcam";
interface Props {
  cuurrentChatId: TOBE;
  setCameraOn: TOBE;
  setLoading: TOBE;
}
const Camera = ({ cuurrentChatId, setCameraOn,setLoading }: Props) => {
  const webcamRef = useRef<WebCam>(null);
  const [image, setImage] = useState<any>(null);
  const [progress, setprogressImg] = useState<any>();
  const { socket, rooms } = useContext(SocketContext);
  const user = useUserStore((state) => state.user);
  const captureImage = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
    }
  };
  const queryClient = useQueryClient();
  const { mutate: newMessageMutate } = useMutation({
    mutationFn: sendNewMessageHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages"] as any);
    },
  });

  const handleSend = async () => {
    setLoading(true)
    const uploadedImage = await UseCloudinaryImage(image, setprogressImg);
    const isActiveRoom = rooms[cuurrentChatId]?.length > 1;
    newMessageMutate({
      roomId: cuurrentChatId,
      senderId: user?._id,
      message: uploadedImage,
      typeMessage: "image",
      read: isActiveRoom ? true : false,
    });
    socket?.emit("send_msg", {
      roomId: cuurrentChatId,
      message: uploadedImage,
      typeMessage: "image",
      senderId: user?._id,
    });
    setImage("");
    setLoading(false)
    setCameraOn(false);
  };
  return (
    <div className="h-full overflow-hidden absolute left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
      <Card className="h-96 w-96 flex flex-col items-center justify-center">
        {image ? (
          <>
            <img src={image} alt="Captured" className="mt-4 w-[90%] mx-auto" />
            <div className="flex justify-between gap-5 text-white">
              <button
                onClick={() => {
                  setImage("");
                }}
                className="px-4 py-1.5 rounded-md bg-[#20B486] mx-auto mt-4"
              >
                Re Captuere
              </button>

              <button
                onClick={() => {
                  handleSend();
                }}
                className="px-4 py-1.5 rounded-md bg-[#20B486] mx-auto mt-4"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <>
            <WebCam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-[90%] mx-auto"
            />
            <button
              onClick={captureImage}
              className="px-4 py-1.5 bg-[#20B486] mx-auto mt-4"
            >
              Capture
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Camera;
