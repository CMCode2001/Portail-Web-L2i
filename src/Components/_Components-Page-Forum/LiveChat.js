import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import SendIcon from "@mui/icons-material/Send";
import "../../Styles/LiveChat.css";
import { SERVER_URL } from "../../Utils/constantURL";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const client = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const socketUrl = SERVER_URL + "/ws";

    client.current = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      onConnect: () => {
        setConnected(true);

        // Send join message
        if (currentUser) {
          const joinMessage = {
            type: "JOIN",
            message: `${currentUser.name} a rejoint le chat.`,
            authorName: currentUser.name,
          };
          client.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(joinMessage),
          });
        }

        client.current.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onDisconnect: () => {
        setConnected(false);

        // Send leave message
        if (currentUser) {
          const leaveMessage = {
            type: "LEAVE",
            message: `${currentUser.name} a quitté le chat.`,
            authorName: currentUser.name,
          };
          client.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(leaveMessage),
          });
        }
      },
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    const getUserInfo = () => {
      const userJson = sessionStorage.getItem("user");

      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          return user;
        } catch (error) {
          console.error(
            "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
            error
          );
        }
      } else {
        console.warn("Aucun utilisateur trouvé dans le sessionStorage");
      }
      return null;
    };

    const user = getUserInfo();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        type: "CHAT",
        message: message,
        authorName: currentUser?.name,
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

  return sessionStorage.getItem("isLoggedIn") ? (
    <div className="live-chat">
      <div className="chat-header">Live Chat</div>
      <div className="chat-box">
        {!connected ? (
          <div className="connecting">Connecting...</div>
        ) : (
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type.toLowerCase()}`}>
                <strong>{msg.authorName}: </strong>
                <span
                  style={
                    msg.type === "JOIN"
                      ? { color: "#4a90e2" }
                      : msg.type === "LEAVE"
                      ? { color: "#e94e77" }
                      : {}
                  }
                >
                  {msg.message}
                </span>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
        <div className="input-box">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="message-input"
          />
          <SendIcon className="send-icon" id="btnPro" onClick={sendMessage} />
        </div>
      </div>
    </div>
  ) : (
    <div className="login-reminder">Please log in to join the chat</div>
  );
};

export default LiveChat;
