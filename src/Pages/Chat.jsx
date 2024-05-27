import { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";
import UserChat from "../components/UserChat";
import PotentialChat from "../components/PotentialChat";
import ChatBox from "../components/ChatBox";

function Chat() {
  const { userChat, isUserChatLoading, updateCurrentChat } =
    useContext(ChatContext);

  const { user } = useContext(Context);
  return (
    <>
      <PotentialChat />
      <h1 className="text-white container mx-auto">
        {userChat?.length < 1 ? null : (
          <div className="flex pt-4 gap-x-4">
            <div className="h-[85vh] gap-y-3">
              {isUserChatLoading && <p>Loading Chats...</p>}
              {userChat?.map((chat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateCurrentChat(chat);
                    }}
                  >
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
            </div>
            <ChatBox />
          </div>
        )}
      </h1>
    </>
  );
}

export default Chat;
