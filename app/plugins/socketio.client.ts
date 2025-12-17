import { Manager } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const uri = new URL(import.meta.env.VITE_API_URL).toString();
  const sio = new Manager(uri, {
    transports: ["websocket", "webtransport"],
    withCredentials: true,
    autoConnect: true,
    reconnection: true,
  });

  return {
    provide: {
      botNs: sio.socket("/bot"),
      fileNs: sio.socket("/files"),
    },
  };
});
