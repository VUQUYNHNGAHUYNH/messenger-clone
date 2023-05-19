import { User } from "@prisma/client";
import Image from "next/image";

type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          fill
        />
      </div>
      <span className="absolute block rounded-full ring-white bg-green-500 ring-2 top-0 right-0 w-3 h-3" />
    </div>
  );
};

export default Avatar;
