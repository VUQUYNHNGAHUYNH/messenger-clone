"use client";

import Avatar from "@/app/components/Avatar";
import { MessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";

type MessageBoxType = {
  isLast?: boolean;
  data: MessageType;
};

const MessageBox: React.FC<MessageBoxType> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data?.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const avatar = clsx(isOwn && "order-2");
  const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-600 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">{data.sender.name}</span>
          <span className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </span>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              src={data.image}
              alt="image"
              width={280}
              height={280}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && (
          <div className="text-xs text-gray-400">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
