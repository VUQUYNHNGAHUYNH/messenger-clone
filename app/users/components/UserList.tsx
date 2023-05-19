"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

type UserListProps = {
  items: User[];
};

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <div className="fixed w-full block left-0  lg:w-80 p-8 lg:left-28 overflow-y-hidden border-r">
      <div className="text-2xl font-bold text-sky-600 py-4">Users</div>
      {items.map((item) => (
        <UserBox key={item.id} data={item} />
      ))}
    </div>
  );
};

export default UserList;
