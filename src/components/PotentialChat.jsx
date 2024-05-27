import { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import { Context } from "../Context/Context";

function PotentialChat() {
  const { potentialChat, createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(Context);
  return (
    <>
      <div className="flex text-white gap-x-4">
        {potentialChat &&
          potentialChat.map((u, index) => {
            return (
              <div
                key={index}
                className=" p-1 bg-blue-500 rounded-md"
                onClick={() => {
                  createChat(user._id, u._id);
                }}
                role="button"
              >
                <p className="relative pe-5">
                  {u.name}
                  <span
                    className={
                      onlineUsers?.some((user) => user?.userId === u?._id)
                        ? "w-3 h-3 rounded-full bg-green-500 absolute top-0 right-0"
                        : ""
                    }
                  ></span>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default PotentialChat;
