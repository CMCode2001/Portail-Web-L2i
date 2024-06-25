import React, { useRef, useState } from "react";
//import ForumL2i from "../Components/_Components-Page-Forum/Forum";
import HeaderBlock from "../Components/Header/HeaderBlock";
//import { Client } from "@stomp/stompjs";
//import SockJS from "sockjs-client";
import PosezUneQuestion from "../Components/_Components-Page-Forum/PosezUneQuestion";

// export default function Forum() {
//   return (
//     <div>
//         <HeaderBlock/>
//         <ForumL2i/>
//     </div>
//   )
// }

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const client = useRef(null);

  // useEffect(() => {
  // URL du serveur WebSocket
  // const socketUrl = "http://localhost:8083/ws";
  // const socketUrl = "http://localhost:8083/api/ws";
  //   const socketUrl = "http://192.168.18.144:8083/api/ws";

  //   client.current = new Client({
  //     webSocketFactory: () => new SockJS(socketUrl),
  //     onConnect: () => {
  //       setConnected(true);
  //       client.current.subscribe("/topic/public", (message) => {
  //         const newMessage = JSON.parse(message.body);
  //         setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       });
  //     },
  //     onDisconnect: () => setConnected(false),
  //   });

  //   client.current.activate();

  //   return () => {
  //     if (client.current) {
  //       client.current.deactivate();
  //     }
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (message.trim() && username.trim()) {
  //     const chatMessage = {
  //       authorName: username,
  //       message: message,
  //       forum_id: 1, // Exemple de forum ID
  //     };
  //     client.current.publish({
  //       destination: "/app/chat.sendMessage",
  //       body: JSON.stringify(chatMessage),
  //     });
  //     setMessage("");
  //   }
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     sendMessage();
  //   }
  // };

  // const handleUsernameSubmit = () => {
  //   if (username.trim()) {
  //     client.current.publish({
  //       destination: "/app/chat.addUser",
  //       body: JSON.stringify({ authorName: username }),
  //     });
  //   }
  // };

  return (
    <div>
      <HeaderBlock />
      {/* <HeaderForum/> */}
      <br />
      <PosezUneQuestion />
    </div>
  );
};

export default Forum;
