import React, { useEffect, useRef, useState } from "react";
//import ForumL2i from "../Components/_Components-Page-Forum/Forum";
import HeaderBlock from "../Components/Header/HeaderBlock";
//import { Client } from "@stomp/stompjs";
//import SockJS from "sockjs-client";
import PosezUneQuestion from "../Components/_Components-Page-Forum/PosezUneQuestion";
import HeaderForum from "../Components/_Components-Page-Forum/HeaderForum";
import FooterBlock from "../Components/Footer/FooterBlock";
import { SERVER_URL } from "../constantURL";
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
