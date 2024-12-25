import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Video, Mic, MicOff, PhoneOff } from "lucide-react";
import { io, Socket } from "socket.io-client"; // Import Socket type

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
}

interface ChatRoomProps {
  roomName: string;
}

export function ChatRoom({ roomName }: ChatRoomProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null); // Correctly type socketRef
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize Socket.io client
    socketRef.current = io("http://localhost:3000");

    // Handle incoming chat messages
    socketRef.current.on("chat_message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Handle WebRTC signaling messages
    socketRef.current.on("offer", handleOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice_candidate", handleNewICECandidate);

    return () => {
      socketRef.current?.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      const message: Message = {
        id: Date.now().toString(),
        user: user.firstName,
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
      socketRef.current?.emit("chat_message", message); // Safely call emit
    }
  };

  const toggleAudio = () => {
    setIsMuted((prev) => !prev);
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => (track.enabled = !track.enabled));
    }
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => (track.enabled = !track.enabled));
    }
  };

  const startCall = async () => {
    setIsInCall(true);
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      peerConnectionRef.current = new RTCPeerConnection();
      localStreamRef.current.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current?.emit("ice_candidate", event.candidate); // Safely call emit
        }
      };
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current?.emit("offer", offer); // Safely call emit
    } catch (err) {
      console.error("Error starting call:", err);
    }
  };

  const endCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOn(false);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current?.emit("answer", answer); // Safely call emit
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    }
  };

  const handleNewICECandidate = (candidate: RTCIceCandidate) => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{roomName} Chat Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-2">
          <Button
            onClick={toggleAudio}
            variant={isMuted ? "destructive" : "default"}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button
            onClick={toggleVideo}
            variant={isVideoOn ? "default" : "secondary"}
          >
            <Video />
          </Button>
          <Button
            onClick={isInCall ? endCall : startCall}
            variant={isInCall ? "destructive" : "default"}
          >
            {isInCall ? <PhoneOff /> : "Start Call"}
          </Button>
        </div>
        {isInCall && (
          <div className="flex justify-center space-x-2">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-1/2 h-auto"
            />
            <video ref={remoteVideoRef} autoPlay className="w-1/2 h-auto" />
          </div>
        )}
        <div className="overflow-y-auto p-2 h-64 rounded border">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              <span className="font-bold">{message.user}: </span>
              <span>{message.content}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
