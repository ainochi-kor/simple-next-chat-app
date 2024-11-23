"use client";

import SideBar from "@/components/SideBar";
import { IoChatbubbleOutline } from "react-icons/io5";
import { db } from "@/firebase";
import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      // 유저 정보 데이터 베이스에 저장
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastActiveAt: serverTimestamp(),
          photoURL: user.photoURL,
          displayName: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CgSpinner className="animate-spin w-20 h-10" />
      </div>
    );
  }

  return (
    <main className="grid w-full grid-cols-8">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-6 flex justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <IoChatbubbleOutline className="w-24 h-24 text-gray-300" />
          <p className="text-2xl text-gray-300">대화를 시작합니다.</p>
        </div>
      </div>
    </main>
  );
}
