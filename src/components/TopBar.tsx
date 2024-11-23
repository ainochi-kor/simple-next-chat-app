"use client";

import { User } from "firebase/auth";
import Image from "next/image";
import React from "react";

interface TopBarProps {
  user: User | null;
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
  return (
    <div className="h-[70px] border-b-[1px] space-x-4 flex items-center px-6 py-4 ">
      <Image
        src={user?.photoURL || "/default-profile.jpg"}
        width={40}
        height={40}
        className="rounded-full object-cover"
        alt={user?.displayName || "Unknown"}
      />
      <span className="font-bold">{user?.displayName || "Unknown"}</span>
    </div>
  );
};

export default TopBar;
