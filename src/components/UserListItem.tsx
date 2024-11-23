"use client";

import { db } from "@/firebase";
import { IChat } from "@/types";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface UserListItemProps {
  reveiver: User;
  sender: User;
  chats: IChat[];
  selectedChatId?: string;
}

const UserListItem = ({
  chats,
  reveiver,
  sender,
  selectedChatId,
}: UserListItemProps) => {
  const router = useRouter();

  const chatExists = (receiverEmail: string) => {
    const senderEmail = sender.email!;
    return chats?.find(
      (chat: IChat) =>
        chat?.users?.includes(senderEmail) &&
        chat?.users?.includes(receiverEmail)
    );
  };

  const chat = chatExists(reveiver.email!);

  const redirect = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const handleClick = async () => {
    const senderData = {
      displayName: sender.displayName,
      photoURL: sender.photoURL,
      email: sender.email,
    };

    const receiverData = {
      displayName: reveiver.displayName,
      photoURL: reveiver.photoURL,
      email: reveiver.email,
    };

    if (!chat) {
      const { id } = await addDoc(collection(db, "chats"), {
        usersData: [senderData, receiverData],
        users: [sender.email, reveiver.email],
        timestamp: serverTimestamp(),
      });

      redirect(id);
    } else {
      redirect(chat.id);
    }
  };

  return (
    <div className="w-full p-4">
      <div
        className={`
          w-5/6 mx-auto px-4 flex flex-row items-center py-2 cursor-pointer
          ${chat && chat?.id === selectedChatId ? "border rounded-md" : ""}  
        `}
        onClick={handleClick}
      >
        <div>
          <Image
            src={reveiver.photoURL!}
            alt={reveiver.displayName!}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="ml-4">
          <p>{reveiver.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
