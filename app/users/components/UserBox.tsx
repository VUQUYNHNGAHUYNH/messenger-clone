import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Avatar from "@/app/components/Avatar";

type UserBoxProps = {
  data: User;
};

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-2 cursor-pointer relative hover:bg-gray-100 rounded-lg w-full "
    >
      <Avatar user={data} />
      <div className="text-sm font-medium text-slate-900 pl-2 lg:pl-4">
        {data.name}
      </div>
    </div>
  );
};

export default UserBox;
