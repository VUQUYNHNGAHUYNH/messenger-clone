import getConversations from "../actions/getConversations";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
