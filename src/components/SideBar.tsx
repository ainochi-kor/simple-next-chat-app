"use client";

import { auth, db } from "@/firebase";
import { collection, DocumentData } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { CgSpinner } from "react-icons/cg";
import UserListItem from "./UserListItem";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const [userMe] = useAuthState(auth);

  const [snapshotUser] = useCollection(collection(db, "users"));
  const users = snapshotUser?.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const filteredUsers = users?.filter((user) => user.id !== userMe?.uid);

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  if (!userMe) {
    return (
      <div className="flex justify-center mt-10">
        <CgSpinner className="animate-spin w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <aside className="flex flex-col items-start w-full h-screen border-l border-r border-gray-200">
      <div className="flex items-center justify-between w-full p-4 text-xl font-bold border-b border-gray-200 h-[70px]">
        <p>채팅</p>
        <button onClick={() => logout()} className="text-sm font-medium">
          로그아웃
        </button>
      </div>
      <div>
        <UserListItem />
      </div>
    </aside>
  );
};

export default SideBar;
