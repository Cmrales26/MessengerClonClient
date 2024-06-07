import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/message/:chatId" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
