import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChat, setUserChat] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [potentialChat, setPotentialChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers]= useState([])
  const [notif, setNotif] = useState([])


  useEffect(()=>{
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return ()=>{
      newSocket.disconnect()
    }
  }, [user])

  useEffect(()=>{
    if (socket === null) return
    socket.emit("addnewuser", user?._id)
    socket.on("getOnlineUser", (res)=>{
      setOnlineUsers(res)
    })

    return ()=>{
      socket.off("getOnlineUser")
    }
  }, [socket])

  useEffect(()=>{
    if (socket === null) return
    const recipientId = currentChat?.members?.find((id) => id !== user?._id)

    socket.emit("sendMessage", {
      ...newMessage, recipientId
    })

  }, [newMessage])
//receive
  useEffect(()=>{
    if (socket === null) return

    socket.on("getMessage",res=>{
      if(currentChat._id !== res.chatId) return 
      setMessages(prev => [...prev, res])
    } )

    socket.on("getNotif", res =>{
      const isChatOpen = currentChat?.members.some(id => id === res.senderId)
      if (isChatOpen){
        setNotif(prev => [{...res, isRead:true }, ...prev])
      } else{
        setNotif(prev => [res, ...prev])
      }
    })

    return () =>{
      socket.off("getMessage")
      socket.off("getNotif")
    }

  }, [socket, currentChat])

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/user`);
      if (response.error) return console.log(response);

      const pchats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u?._id) return false;
        if (userChat) {
          isChatCreated = userChat?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChat(pchats);
    };

    getUsers();
  }, [userChat]);

  useEffect(() => {
    const getUserChat = async () => {
      if (user?._id) {
        setIsUserChatLoading(true);
        setUserChatError(null);
        const response = await getRequest(`${baseUrl}/chat/${user._id}`);
        setIsUserChatLoading(false);

        if (response.error) return setUserChatError(response);
        setUserChat(response);
      }
    };

    getUserChat();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/message/${currentChat?._id}`
      );
      setIsMessagesLoading(false);

      if (response.error) return setMessagesError(response);
      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something");
      const response = await postRequest(
        `${baseUrl}/message`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setTextError(response);
      }

      setNewMessage(response);

      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chat`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) return console.log(response);
    setUserChat((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChat,
        isUserChatLoading,
        userChatError,
        createChat,
        potentialChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notif
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};
