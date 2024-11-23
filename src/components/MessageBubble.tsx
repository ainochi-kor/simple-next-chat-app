"use client";

import { IMessage } from "@/types";
import { User } from "firebase/auth";
import Image from "next/image";
import React from "react";

interface MessageBubbleProps {
  user: User;
  message: IMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ user, message }) => {
  const isSenderMe = message.sender === user.email;

  return (
    <div
      className={
        "flex space-x-2 items-center w-full " +
        (isSenderMe ? "justify-end" : "justify-start")
      }
    >
      {!isSenderMe && (
        <div className="mr-3">
          <Image
            width={30}
            height={30}
            src={message.photoURL || "/default-profile.jpg"}
            alt={message.sender}
            className="rounded-full"
          />
        </div>
      )}
      <div
        className={`
          py-3 px-4 rounded-lg  my-1 text-sm w-auto max-w-lg
          ${
            isSenderMe
              ? "bg-blue-500 text-white rounded-tr-none"
              : "bg-[#D9D9D9] rounded-tl-none"
          }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
