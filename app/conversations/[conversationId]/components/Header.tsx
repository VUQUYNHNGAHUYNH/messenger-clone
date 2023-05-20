"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

type HeaderProps = {
  conversation: Conversation & {
    users: User[];
  };
};
const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);
  return (
    <div className="bg-white w-full flex items-center justify-between shadow-sm border-b px-4 py-2">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-sky-600 hover:text-sky-700 cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <span className="text-gray-800 font-semibold text-md">
            {conversation.name || otherUser.name}
          </span>
          <span className="text-gray-500 text-sm font-light">{statusText}</span>
        </div>
      </div>

      <HiEllipsisHorizontal
        size={34}
        className="text-sky-600 hover:text-sky-700 transition cursor-pointer"
      />
    </div>
  );
};

export default Header;
