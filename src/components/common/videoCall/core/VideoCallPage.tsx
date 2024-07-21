"use client";
import { Card } from "@/components/ui/card";
import { SocketContext } from "@/store/storeProviders/SocketProvider";
import { useStdudentStore } from "@/store/storeProviders/UseCallStore";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import {
  Call,
  CallEnd,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";

const VideoCallPage = () => {
  const [myStream, setMyStream] = useState<MediaStream | undefined>(undefined);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<any>(null);
  const user = useUserStore((state) => state.user);
  const peerRef = useRef<any>();
  const { socket } = useContext(SocketContext);
  const student = useStdudentStore((state) => state.student);
  const setStudentId = useStdudentStore((state) => state.setStudentId);
  const { id } = useParams();
  const incomingCall = useStdudentStore((state) => state.incomingCall);
  const setIncomingCall = useStdudentStore((state) => state.setIncomingCall);
  const callerSignal = useStdudentStore((state) => state.callerSignal);
  const setCallerSignal = useStdudentStore((state) => state.setCallerSignal);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const router = useRouter();
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
    socket?.on("endCall", () => {
      endCall();
    });
    socket?.on("offer", (offerSignal) => {
      setCallerSignal(offerSignal.signal);
      setIncomingCall(true);
    });

    startMediaStream();

    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = null;
      }
      if (peerVideoRef.current) {
        peerVideoRef.current.srcObject = null;
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      socket?.off("offer");
      socket?.off("endCall");
    };
  }, [socket]);

  const callToStudent = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (data) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>student", student);
      socket?.emit("callStudent", {
        studentToCall: student,
        signalData: data,
        from: user?._id,
      });
    });
    socket?.on("callAccepted", (signal) => {
      // setCallAccept(true);
      peer?.signal(signal);
    });
    peer.on("stream", (stream) => {
      peerVideoRef!.current.srcObject = stream;
    });

    peer.on("close", () => {
      endCall();
    });

    peerRef.current = peer;
    setIsConnected(true);
  };

  const answerCall = () => {
    if (!callerSignal) {
      console.error("No caller signal available");
      return;
    }

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (data) => {
      socket?.emit("answerCall", {
        signal: data,
        to: student,
      });
    });

    peer.on("stream", (stream) => {
      if (peerVideoRef.current) {
        peerVideoRef.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    setCallAccepted(true);
    setIncomingCall(null);
    peerRef.current = peer;
    setIsConnected(true);
  };

  const toggleMute = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };
  const endCall = async () => {
    if (peerRef.current) {
      peerRef.current.destroy();
    }

    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }

    if (myVideoRef.current) {
      myVideoRef.current.srcObject = null;
    }
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = null;
    }
    socket?.emit("endCall", { to: student });
    setMyStream(undefined);
    setIsConnected(false);
    setCallAccepted(false);
    setIncomingCall(null);
    setCallerSignal(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setStudentId(null)

    await new Promise((resolve) => setTimeout(resolve, 100));

    router.push(`/courses/${id}/chat`);
  };
  console.log("_________________________________");
  console.log(callerSignal);
  console.log("_________________________________");
  console.log("_________________________________");
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[80vw] h-[80vh] relative overflow-hidden">
        {isConnected ? (
          <video
            ref={peerVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          ></video>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-2xl text-gray-600">Waiting for connection...</p>
          </div>
        )}

        <video
          ref={myVideoRef}
          className={`absolute bottom-4 right-4 w-48 h-36 object-cover rounded-lg ${
            isConnected ? "" : "hidden"
          }`}
          autoPlay
          playsInline
          muted
        ></video>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={toggleMute}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={toggleVideo}
            className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            {isVideoOff ? <VideocamOff /> : <Videocam />}
          </button>
          {isConnected ? (
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
            >
              <CallEnd />
            </button>
          ) : (
            <button
              onClick={callToStudent}
              className="p-3 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600"
            >
              <Call />
            </button>
          )}
        </div>

        {incomingCall && student !== user?._id && !callAccepted && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md">
            <p className="mb-2">Incoming call...</p>
            <button
              onClick={answerCall}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Answer
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VideoCallPage;
