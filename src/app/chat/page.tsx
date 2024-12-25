"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChatRoom } from "@/components/ChatRoom";
import { Button } from "@/components/ui/button";
import { UserRole } from "../../../types/user";
const user: UserRole = "admin";

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

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-white bg-gray-900">
        <h2 className="mb-4 text-3xl font-bold">Access Restricted</h2>
        <p className="mb-6 text-lg text-gray-400">
          You need to <a href="/login">log in</a> to view your profile.
          <br />
          <button className="py-3 px-6 text-lg font-semibold text-blue-200 bg-white rounded-lg shadow-md hover:text-blue-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <a href="/login">Log In</a>
          </button>
        </p>
      </div>
    );
  } else {
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
}
