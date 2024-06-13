import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVER_ROUTE;

export const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true,
});
