"use client";

import { db } from "@/firebase";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoPaperPlaneOutline } from "react-icons/io5";

interface BottomBarProps {
  user: User;
  chatId: string;
}

const BottomBar: React.FC<BottomBarProps> = ({
  chatId,
  user,
}: BottomBarProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = e.currentTarget.message;

    if (message.value.trim().length === 0) return;
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: message.value,
      sender: user.email,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });

    message.value = "";
  };

  return (
    <div>
      <form
        className="flex items-end w-full px-6 pb-4 space-x-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="message"
          placeholder="메시지를 입력하세요."
          className="w-full px-4 py-4 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-gray-400"
          maxLength={256}
        />
        <button>
          <IoPaperPlaneOutline className="mb-4 text-gray-600 w-7 h-7 hover:text-gray-900" />
        </button>
      </form>
    </div>
  );
};

export default BottomBar;
