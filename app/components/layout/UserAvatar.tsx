import React from "react";
import Link from "next/link";

const UserAvatar = () => {
  return (
    <Link href="/user" className="ml-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 border-2 border-orange-500 flex items-center justify-center">
        <span className="text-orange-800 font-bold text-sm">U</span>
      </div>
    </Link>
  );
};

export default UserAvatar;
