import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Chat from "./pages/Chat";
import Create from "./pages/Create";
import { ChatProvider } from "./context/chatContex";
import Request from "./pages/Request";

function App() {
  return (
    <div
      className="App"
      style={{
        overflow: "hidden",
      }}
    >
      <ChatProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/message/:chatId" element={<Chat />} />
            <Route path="/ChatRequest" element={<Request />} />
          </Route>
        </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
