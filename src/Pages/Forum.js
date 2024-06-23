import React, { useState, useEffect, useRef } from "react";
import ForumL2i from "../Components/_Components-Page-Forum/Forum";
import HeaderBlock from "../Components/Header/HeaderBlock";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "../Styles/Forum.css";

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

  useEffect(() => {
    // URL du serveur WebSocket
    const socketUrl = "http://localhost:8083/ws";
    // const socketUrl = "http://localhost:8083/api/ws";

    client.current = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      onConnect: () => {
        setConnected(true);
        client.current.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onDisconnect: () => setConnected(false),
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      const chatMessage = {
        authorName: username,
        message: message,
        forum_id: 1, // Exemple de forum ID
      };
      client.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      client.current.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({ authorName: username }),
      });
    }
  };

  return (
    <div>
      <HeaderBlock />
      <div className="chat-container">
        {!connected ? (
          <div>Connecting...</div>
        ) : (
          <div>
            {!username ? (
              <div className="username-container">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={handleUsernameSubmit}>Join Chat</button>
              </div>
            ) : (
              <div className="chat-box">
                <div className="message-list">
                  {messages.map((msg, index) => (
                    <div key={index} className="message">
                      <strong>{msg.authorName}: </strong> {msg.message}
                    </div>
                  ))}
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
