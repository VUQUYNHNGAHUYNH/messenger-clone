"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { ConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

type ConversationBoxProps = {
  data: ConversationType;
  selected?: boolean;
};

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUsers = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenMessages = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenMessages.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-gray-100 rounded-lg cursor-pointer p-3`,
        selected ? "bg-gray-200" : "bg-white"
      )}
    >
      <Avatar user={otherUsers} />

      <div className="flex items-center justify-between space-x-4 w-full px-4 lg:px-0">
        <div className="flex flex-col">
          <p className="text-md font-medium text-slate-900">
            {data.name || otherUsers.name}
          </p>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
        {lastMessage?.createdAt && (
          <p className="lg:text-xs  text-sm text-gray-500 font-light">
            {format(new Date(lastMessage.createdAt), "p")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ConversationBox;
