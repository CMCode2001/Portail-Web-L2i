import React from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderForum from "../Components/_Components-Page-Forum/HeaderForum";
import ModalBulleMessagerie from "../Components/_Components-Page-Forum/ModalBulleMessagerie";

const Forum = () => {
  return (
    <div>
      <HeaderBlock />
      <HeaderForum />
      <br />
      <ModalBulleMessagerie />
      <FooterBlock />
    </div>
  );
};

export default Forum;
