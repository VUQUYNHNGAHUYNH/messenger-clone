import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const user = await prisma.user.findMany({
      // new user first
      orderBy: {
        createdAt: "desc",
      },
      //   not shown current user in message user list
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return user;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
