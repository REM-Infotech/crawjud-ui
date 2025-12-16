import { Manager } from "socket.io-client";

export default function () {
  const uri = new URL(import.meta.env.VITE_API_URL).toString();
  return new Manager(uri, {
    withCredentials: true,
    autoConnect: false,
  });
}
