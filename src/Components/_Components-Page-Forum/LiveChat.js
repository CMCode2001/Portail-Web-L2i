import SendIcon from "@mui/icons-material/Send";
import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import "../../Styles/LiveChat.css";
import { SERVER_URL } from "../../Utils/constantURL";
import { useAuth } from "../../Utils/AuthContext";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const client = useRef(null);
  const messageEndRef = useRef(null);
  const { authData } = useAuth();

  const currentUser = authData.user;
  const isLoggedIn = authData.isLoggedIn;

  // useEffect(() => {
  //   const socketUrl = SERVER_URL + "/ws";

  //   client.current = new Client({
  //     webSocketFactory: () => new SockJS(socketUrl),
  //     onConnect: () => {
  //       setConnected(true);

  //       // Send join message
  //       if (currentUser) {

  //         const joinMessage = {
  //           type: "JOIN",
  //           message: `${currentUser.firstName} ${currentUser.lastName} a rejoint le chat.`,
  //           // authorName: currentUser.name,
  //           authorName: `${currentUser.firstName} ${currentUser.lastName}`
  //         };
  //         client.current.publish({
  //           destination: "/app/chat.sendMessage",
  //           body: JSON.stringify(joinMessage),
  //         });
  //         console.log(currentUser.firstName + " "+currentUser.lastName)
  //       }

  //       client.current.subscribe("/topic/public", (message) => {
  //         const newMessage = JSON.parse(message.body);
  //         setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       });
  //     },
  //     onDisconnect: () => {
  //       setConnected(false);

  //       // Send leave message
  //       if (currentUser) {
  //         const leaveMessage = {
  //           type: "LEAVE",
  //           message: `${currentUser.firstName} ${currentUser.lastName} a quitté le chat.`,
  //           authorName:`${currentUser.firstName} ${currentUser.lastName}`,
  //         };
  //         client.current.publish({
  //           destination: "/app/chat.sendMessage",
  //           body: JSON.stringify(leaveMessage),
  //         });
  //       }
  //     },
  //   });

  //   client.current.activate();

  //   return () => {
  //     if (client.current) {
  //       client.current.deactivate();
  //     }
  //   };
  // }, [currentUser]);

  // useEffect(() => {
  //   const socketUrl = SERVER_URL + "/ws";

  //   // Récupérer le token depuis le sessionStorage
  //   const token = sessionStorage.getItem("access_token");

  //   client.current = new Client({
  //     webSocketFactory: () => new SockJS(socketUrl),
  //     onConnect: () => {
  //       setConnected(true);

  //       // Envoyer un message de JOIN quand l'utilisateur se connecte
  //       if (currentUser) {
  //         const joinMessage = {
  //           type: "JOIN",
  //           message: `${currentUser.firstName} ${currentUser.lastName} a rejoint le chat.`,
  //           authorName: `${currentUser.firstName} ${currentUser.lastName}`,
  //         };

  //         // Publier le message avec le token dans l'en-tête si nécessaire
  //         client.current.publish({
  //           destination: "/app/chat.sendMessage",
  //           body: JSON.stringify(joinMessage),
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Inclure le token ici
  //           },
  //         });
  //       }

  //       // S'abonner au canal public
  //       client.current.subscribe("/topic/public", (message) => {
  //         const newMessage = JSON.parse(message.body);
  //         setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       });
  //     },
  //     onDisconnect: () => {
  //       setConnected(false);

  //       // Envoyer un message de LEAVE quand l'utilisateur se déconnecte
  //       if (currentUser) {
  //         const leaveMessage = {
  //           type: "LEAVE",
  //           message: `${currentUser.firstName} ${currentUser.lastName} a quitté le chat.`,
  //           authorName: `${currentUser.firstName} ${currentUser.lastName}`,
  //         };

  //         // Publier le message de LEAVE avec le token
  //         client.current.publish({
  //           destination: "/app/chat.sendMessage",
  //           body: JSON.stringify(leaveMessage),
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Inclure le token
  //           },
  //         });
  //       }
  //     },
  //   });

  //   client.current.activate();

  //   return () => {
  //     if (client.current) {
  //       client.current.deactivate();
  //     }
  //   };
  // }, [currentUser]);

  useEffect(() => {
    const socketUrl = SERVER_URL + "/ws";
    // const token = sessionStorage.getItem("access_token");

    client.current = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      onConnect: () => {
        setConnected(true); // La connexion est maintenant établie

        // Envoyer un message de JOIN si l'utilisateur est connecté
        if (currentUser) {
          const joinMessage = {
            type: "JOIN",
            message: `${currentUser.firstName} ${currentUser.lastName} a rejoint le chat.`,
            authorName: `${currentUser.firstName} ${currentUser.lastName}`,
          };

          client.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(joinMessage),
            // headers: {
            //   Authorization: `Bearer ${token}`, // Inclure le token ici
            // },
          });
        }

        // S'abonner au canal public pour recevoir les messages
        client.current.subscribe("/topic/public", (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Erreur STOMP: ", frame.headers["message"]);
        console.error("Détails: ", frame.body);
      },
      onWebSocketError: (error) => {
        console.error("Erreur de connexion WebSocket: ", error);
      },
      onDisconnect: () => {
        setConnected(false);
      },
    });

    client.current.activate(); // Activer la connexion WebSocket

    return () => {
      if (client.current) {
        client.current.deactivate(); // Désactiver la connexion WebSocket lors du démontage du composant
      }
    };
  }, [currentUser]);

  // useEffect(() => {
  //   const getUserInfo = () => {
  //     const userJson = sessionStorage.getItem("user");

  //     if (userJson) {
  //       try {
  //         const user = JSON.parse(userJson);
  //         return user;
  //       } catch (error) {
  //         console.error(
  //           "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
  //           error
  //         );
  //       }
  //     } else {
  //       console.warn("Aucun utilisateur trouvé dans le sessionStorage");
  //     }
  //     return null;
  //   };

  //   const user = getUserInfo();
  //   setCurrentUser(user);
  // }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     const chatMessage = {
  //       type: "CHAT",
  //       message: message,
  //       authorName: `${currentUser?.firstName} ${currentUser?.lastName}` ,
  //     };
  //     client.current.publish({
  //       destination: "/app/chat.sendMessage",
  //       body: JSON.stringify(chatMessage),
  //     });
  //     setMessage("");
  //   }
  // };

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     const token = sessionStorage.getItem("access_token"); // Récupérer le token
  //     const chatMessage = {
  //       type: "CHAT",
  //       message: message,
  //       authorName: `${currentUser?.firstName} ${currentUser?.lastName}`,
  //     };

  //     // Publier le message avec le token dans l'en-tête
  //     client.current.publish({
  //       destination: "/app/chat.sendMessage",
  //       body: JSON.stringify(chatMessage),
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Inclure le token dans la requête
  //       },
  //     });

  //     setMessage("");
  //   }
  // };

  const sendMessage = () => {
    // Vérifier si le client est connecté avant d'envoyer le message
    if (!connected || !client.current.connected) {
      console.error("La connexion STOMP n'est pas encore établie.");
      return;
    }

    if (message.trim()) {
      // const token = sessionStorage.getItem("access_token"); // Récupérer le token
      const chatMessage = {
        type: "CHAT",
        message: message,
        authorName: `${currentUser?.firstName} ${currentUser?.lastName}`,
      };

      // Publier le message avec le token dans l'en-tête
      client.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
        // headers: {
        //   Authorization: `Bearer ${token}`, // Inclure le token dans la requête
        // },
      });

      setMessage("");
    }
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     sendMessage();
  //   }
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && connected) {
      sendMessage();
    }
  };

  return isLoggedIn ? (
    <div className="live-chat">
      <div className="chat-header">Live Chat</div>
      <div className="chat-box">
        {!connected ? (
          <div className="connecting">Connecting...</div>
        ) : (
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type.toLowerCase()}`}>
                <strong>{msg.authorName} : </strong>
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
