"use client";

import { ConversationType } from "@/app/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

type ConversationListProps = {
  initialItems: ConversationType[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  return (
    <div
      className={clsx(
        ` fixed inset-y-0 pb-20 lg:pb-0 lg:left-36 lg:w-64 overflow-y-hidden
    border-r border-gray-200`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-5 text-sky-600">
          <div className="text-2xl font-bold ">Messages</div>
          <div className="rounded-full p-2 hover:text-sky-700 cursor-pointer">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
      </div>

      {items.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
        />
      ))}
    </div>
  );
};

export default ConversationList;
