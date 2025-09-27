"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const UserAvatar = () => {
  const { data: session } = useSession();
  
  const getInitial = () => {
    if (session?.user?.name) {
      return session.user.name.charAt(0).toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="ml-4">
      <Link href="/profile">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-orange-500 flex items-center justify-center cursor-pointer hover:from-orange-300 hover:to-orange-500 transition-colors duration-300">
          <span className="text-orange-800 font-bold text-sm">{getInitial()}</span>
        </div>
      </Link>
    </div>
  );
};

export default UserAvatar;
