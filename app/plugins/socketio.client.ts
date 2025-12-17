import { Manager } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const uri = new URL(import.meta.env.VITE_API_URL).toString();
  const sio = new Manager(uri, {
    forceNew: true,
    transports: ["websocket", "webtransport"],
    withCredentials: true,
    autoConnect: false,
  });

  return {
    provide: {
      sio: sio,
    },
  };
});
