import React from "react";
import ChatIcon from "../../Assets/img/chat.jpg"; // Assurez-vous que le chemin est correct
import "../../Styles/ChatIcon.css";
import LiveChat from "./LiveChat";

const ChatIconComponent = ({ isLiveChatVisible, onToggle }) => {
  // const [isLiveChatVisible, setIsLiveChatVisible] = useState(false);

  // const toggleLiveChat = () => {
  //   setIsLiveChatVisible(!isLiveChatVisible);
  // };

  // return (
  //   <div className="chat-icon-container">
  //     <img
  //       src={ChatIcon}
  //       alt="Chat Icon"
  //       className="chat-icon"
  //       onClick={toggleLiveChat}
  //     />
  //     {isLiveChatVisible && (
  //       <div className="live-chat-container">
  //         <LiveChat />
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="chat-icon-container">
      <img
        src={ChatIcon}
        alt="Chat Icon"
        className="chat-icon"
        onClick={onToggle}
      />
      {isLiveChatVisible && (
        <div className="live-chat-container">
          <LiveChat />
        </div>
      )}
    </div>
  );
};

export default ChatIconComponent;
