import React from "react";
//import ForumL2i from "../Components/_Components-Page-Forum/Forum";
import HeaderBlock from "../Components/Header/HeaderBlock";
//import { Client } from "@stomp/stompjs";
//import SockJS from "sockjs-client";
import HeaderForum from "../Components/_Components-Page-Forum/HeaderForum";
import FooterBlock from "../Components/Footer/FooterBlock";
import ModalBulleMessagerie from "../Components/_Components-Page-Forum/ModalBulleMessagerie";

const Forum = () => {
  return (
    <div>
      <HeaderBlock />
      <HeaderForum />
      <br />
      {/* <PosezUneQuestion /> */}
      <ModalBulleMessagerie />
      <FooterBlock />
    </div>
  );
};

export default Forum;
