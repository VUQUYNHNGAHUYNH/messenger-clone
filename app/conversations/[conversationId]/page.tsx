import getConversationById from "@/app/actions/getConversationById";
import getMessengers from "@/app/actions/getMessengers";
import EmptyState from "@/app/components/EmptyState";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";

type IParams = {
  conversationId: string;
};

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessengers(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80 flex flex-col">
        <EmptyState />
      </div>
    );
  }
  return (
    <div className="h-full lg:pl-80">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
