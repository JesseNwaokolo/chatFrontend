import useFetchRecipient from "../hooks/useFetchRecipient";
import PropTypes from "prop-types";
import { useContext } from "react";
import { IoMdContact } from "react-icons/io";
import { ChatContext } from "../Context/chatContext";

function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUser } = useContext(ChatContext);
  const isOnline = onlineUser?.some(
    (user) => user?.userId === recipientUser?._id
  );

  return (
    <div
      className="flex justify-between border-b pb-2 text-[14px] gap-x-10 hover:bg-blue-300"
      role="button"
    >
      <div className="flex gap-x-2  items-center justify-start">
        <div className="text-[30px] bg-[#2b818f] rounded-full">
          <IoMdContact />
        </div>
        <div>
          <div className="font-medium">{recipientUser?.name}</div>
          <div className="font-extralight  ">textmessage</div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className={ isOnline ? "w-2 h-2 rounded-full bg-green-400" : ""}></span>
        <div>12/12/24</div>

        {/* <div className="bg-green-700 w-5 h-5 rounded-full text-white flex justify-center items-center text-[80%]">
          2
        </div> */}
      </div>
    </div>
  );
}

UserChat.propTypes = {
  chat: PropTypes.object,
  user: PropTypes.object,
};

export default UserChat;
