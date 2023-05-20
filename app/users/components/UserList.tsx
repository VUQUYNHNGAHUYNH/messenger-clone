"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

type UserListProps = {
  items: User[];
};

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className="px-8">
      <div className="fixed w-full block left-0  lg:w-[300px] p-4 lg:left-28 overflow-y-hidden border-r">
        <div className="text-2xl font-bold text-center text-sky-600 py-4">
          Users
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
