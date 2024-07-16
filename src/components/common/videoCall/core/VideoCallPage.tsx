"use client";
import { Card } from "@/components/ui/card";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useStdudentStore } from "@/store/storeProviders/UseCallStore";
import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
const VideoCallPage = () => {
  const [myStream, setMyStream] = useState<MediaStream | undefined>(undefined);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const { socket } = useContext(SocketContext);
  const student = useStdudentStore((state) => state.student);
  useEffect(() => {
    const startMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startMediaStream();

    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const callToStudent = () => {
    const peer = new Peer({
      initiator: true,
      trickle: true,
      stream: myStream,
    });

    peer.on("signal", (data) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>student", student);
      socket?.emit("callStudent", {
        studentToCall: student,
        signalData: data,
      });
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-96 h-96">
        <video
          ref={myVideoRef}
          className="w-full h-full"
          autoPlay
          playsInline
          muted
        ></video>
        <button
          onClick={callToStudent}
          className="px-4 py-2 rounded-md bg-green-600 text-white"
        >
          Call
        </button>
      </Card>
    </div>
  );
};

export default VideoCallPage;
