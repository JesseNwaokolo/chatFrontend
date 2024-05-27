import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";
import useFetchRecipient from "../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { BsSend } from "react-icons/bs";

function ChatBox() {
  const {
    messages,
    messagesError,
    isMessagesLoading,
    currentChat,
    sendTextMessage,
  } = useContext(ChatContext);
  const { user } = useContext(Context);
  const { recipientUser } = useFetchRecipient(currentChat, user);

  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef()

  useEffect(()=>{
    scroll.current?.scrollIntoView({
      behavior:"smooth"
    })
  }, [messages])

  if (!recipientUser)
    return <p className="text-center w-full">No conversation selected yet</p>;
  if (isMessagesLoading)
    return <p className="text-center w-full">Loading chats..</p>;
  return (
    <>
      <div className="flex flex-col w-full h-[80vh] rounded-lg bg-[#e2aeb3]">
        <div className="bg-red-500 py-2 flex justify-center">
          <strong className="">{recipientUser.name}</strong>
        </div>

        <div className="flex gap-x-2 h-[80%] flex-col mb-2 overflow-y-scroll">
          {messages &&
            messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    message?.senderId === user?._id
                      ? "items-end bg-green-500 h-fit p-2 flex-col flex rounded-md m-2 self-end"
                      : "items-end bg-blue-500 h-fit p-2 flex-col flex rounded-md m-2 self-start"
                  }`}
                  ref ={scroll}
                >
                  <span>{message.text}</span>
                  <span className="text-[10px]">
                    {moment(message.createdAt).calendar()}
                  </span>
                </div>
              );
            })}
        </div>

        <div className="inp w-full flex gap-x-3">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            className="border-blue-500"
          />

          <button className="" onClick={()=>{
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }}>
            <BsSend className="text-black text-5xl me-5 bg-slate-300 p-3 rounded-full" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
