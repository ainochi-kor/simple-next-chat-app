"use client";

import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";
import { auth } from "@/firebase";
import { User } from "firebase/auth";
import { useParams } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatPage: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const [userMe] = useAuthState(auth);

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        {/* Top bar  */}
        Top bar
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full h-full ">
            {/* Messages */}
            Messages
          </div>
        </div>
        {/* Bottom bar */}
        <BottomBar user={userMe as User} chatId={id} />
      </div>
    </main>
  );
};

export default ChatPage;
