import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { Context } from "./Context/Context";
import { ChatContextProvider } from "./Context/chatContext";

function App() {
  const {user} = useContext(Context)
  return (
    <ChatContextProvider user={user}>
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/login" element={user ? <Chat /> : <Login /> } />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ChatContextProvider>
  );
}

export default App;
