import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

type IParams = {
    conversationId?: string;
}

export async function POST( request: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        const { conversationId } = params;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized", {status: 401});
        }

        // find existing conversation
        const exsitingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
              },
              include: {
                messages: {
                  include: {
                    seen: true
                  },
                },
                users: true,
              },
        })

        if(!exsitingConversation){
            return new NextResponse("Invalid Id", {status: 404});
        }

        // find the last message
        const lastMessage = exsitingConversation.messages[exsitingConversation.messages.length - 1]

        if (!lastMessage) {
            return NextResponse.json(exsitingConversation)
        }

        // update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include:{
                seen: true,
                sender: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage)
} catch (error:any) {
    console.error(error,"Error message seen route")
        return new NextResponse("Internal Error", {status: 500});
    }
}