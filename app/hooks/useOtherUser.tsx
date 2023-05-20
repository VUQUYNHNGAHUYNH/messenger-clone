import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { User } from "@prisma/client";
import { ConversationType } from "../types";

const useOtherUser = (
  conversation:
    | ConversationType
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const notCurrentUsers = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return notCurrentUsers[0];
  }, [session?.data?.user?.email, conversation.users]);

  return otherUsers;
};

export default useOtherUser;
