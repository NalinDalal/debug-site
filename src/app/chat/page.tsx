"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatRoom } from "@/components/ChatRoom";
import { Button } from "@/components/ui/button";

const chatRooms = [
  "Competitive Programming",
  "Machine Learning",
  "General Discussion",
];

const ChatRoomSelector = ({
  selectedRoom,
  onSelect,
}: {
  selectedRoom: string;
  onSelect: (room: string) => void;
}) => (
  <div className="flex mb-6 space-x-4">
    {chatRooms.map((room) => (
      <Button
        key={room}
        onClick={() => onSelect(room)}
        variant={selectedRoom === room ? "default" : "outline"}
      >
        {room}
      </Button>
    ))}
  </div>
);

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(chatRooms[0]);

  return (
    <>
      <Header />
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">Chat Rooms</h1>
        <ChatRoomSelector
          selectedRoom={selectedRoom}
          onSelect={setSelectedRoom}
        />
        <ChatRoom roomName={selectedRoom} />
      </main>
    </>
  );
}
