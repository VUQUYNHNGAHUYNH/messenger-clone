import prisma from "@/app/libs/prismadb";

export default async function getMessengers(
    conversationId: string,
   
) {
    try {
        const message = await prisma.message.findMany({
            where:{
                conversationId: conversationId
            },
            include:{
                sender:true,
                seen:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })

        return message
    } catch (error) {
        return []
    }
}