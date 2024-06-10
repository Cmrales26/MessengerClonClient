import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4040";

export const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true,
});
