"use client";

import BottomBar from "@/components/BottomBar";
import MessageBubble from "@/components/MessageBubble";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { auth, db } from "@/firebase";
import { IMessage } from "@/types";
import { User } from "firebase/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
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
  const messageBottomRef = useRef<HTMLDivElement>(null);

  const otherUser = useMemo(() => {
    if (!chat) return null;
    return (chat?.usersData as User[]).filter(
      (user) => user.email !== userMe?.email
    )[0];
  }, [chat, userMe]);

  useEffect(() => {
    if (messageBottomRef.current) {
      messageBottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <main className="grid flex-1 w-full grid-cols-8 min-h-screen">
      <div className="col-span-2">
        <SideBar selectedChatId={id} />
      </div>
      {/* 메시지와 TopBar, BottomBar가 포함된 부분 */}
      <div className="flex flex-col w-full col-span-6 h-screen">
        {/* TopBar: 고정된 높이 */}
        <TopBar user={otherUser} />

        {/* 스크롤 가능한 메시지 영역 */}
        <div className="flex-1 overflow-y-scroll px-6 pt-4  no-scrollbar">
          {loading && (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <CgSpinner className="animate-spin w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="flex flex-col w-full">
            {!loading && messages?.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1">
                <IoChatbubblesOutline className="w-24 h-24 text-gray-300" />
                <p className="mt-2 text-2xl font-medium tracking-tight text-gray-300 ">
                  대화를 시작합니다.
                </p>
              </div>
            )}
            {messages?.map((message, index: number) => {
              return (
                <MessageBubble
                  key={index}
                  message={message as IMessage}
                  user={userMe as User}
                />
              );
            })}
            <div className="pb-4" ref={messageBottomRef} />
          </div>
        </div>

        {/* BottomBar: 고정된 높이 */}
        <BottomBar user={userMe as User} chatId={id} />
      </div>
    </main>
  );
};

export default ChatPage;
