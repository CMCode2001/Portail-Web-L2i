import React from 'react';
import '../../Styles/HeaderForum.css'; 
import Chat from '../../Assets/img/Forum.png'

const HeaderForum = () => {
  return (
    <div className="div-1">
      <div className="component-1">
        <div className="rectangle-7"></div>
        <img className="at-the-office-pana-1" src={Chat} alt="Bulle" />
        <div className="bienvenue-dans-l-2-i-forum">
          Bienvenue,<br />
          dans L2i-Forum<br />
        </div>
        <img className="rectangle" src="rectangle0.png" alt="Rectangle" />
      </div>
    </div>
  );
};

export default HeaderForum;
