"use client";

import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { auth, db } from "@/firebase";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubblesOutline } from "react-icons/io5";

const ChatPage: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const chatQuery = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(chatQuery);
  const [chat] = useDocumentData(doc(db, "chats", id));

  const [userMe] = useAuthState(auth);

  const otherUser = useMemo(() => {
    if (!chat) return null;
    return (chat?.usersData as User[]).filter(
      (user) => user.email !== userMe?.email
    )[0];
  }, [chat, userMe]);

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar selectedChatId={id} />
      </div>
      <div className="flex flex-col w-full col-span-6">
        {/* Top bar  */}
        <TopBar user={otherUser} />
        <div className="flex w-full h-full px-6 pt-4 mb-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full h-full">
            {/* Messages */}
            {loading && (
              <div className="flex flex-col w-full h-full">
                <CgSpinner className="animate-spin w-12 h-12 text-gray-400" />
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1">
                <IoChatbubblesOutline className="w-24 h-24 text-gray-300" />
                <p className="mt-2 text-2xl font-medium tracking-tight text-gray-300 ">
                  대화를 시작합니다.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <BottomBar user={userMe as User} chatId={id} />
      </div>
    </main>
  );
};

export default ChatPage;
