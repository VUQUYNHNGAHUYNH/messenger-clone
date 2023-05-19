import { User } from "@prisma/client";
import Image from "next/image";

type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-12 w-12 md:h-14 md:w-14">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          width={48}
          height={48}
        />
      </div>
      <span className="absolute block rounded-full ring-white bg-green-500 ring-2 top-0 right-0 w-3 h-3" />
    </div>
  );
};

export default Avatar;
