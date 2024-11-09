import React from 'react';
import '../../Styles/ForumExt.css';
import AtTheOfficePana from '../../Assets/img/Forum.png'; 
import SVG from '../../Assets/svg/on-the-office-animate.svg'; 
import PosezUneQuestion from './PosezUneQuestion';

const ForumExt = () => {
  return (
    <div className="containerForum">
      <div className="content">
        <img className="at-the-office-pana" src={AtTheOfficePana} alt="At the office" />
        <div className="text">
          Bienvenue,
          <br />
          dans L2i-Forum 
          <br />
        </div>
        <img className="svg-image" src={SVG} alt="SVG" />
      </div>
   
    </div>
  );
};

export default ForumExt;
