"use client";

import SideBar from "@/components/SideBar";
import { IoChatbubbleOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { CgSpinner } from "react-icons/cg";
import Login from "@/components/Login";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CgSpinner className="animate-spin w-20 h-10" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
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
