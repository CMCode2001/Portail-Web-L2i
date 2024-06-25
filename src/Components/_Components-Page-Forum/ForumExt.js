import React from 'react';
import '../../Styles/ForumExt.css';
import AtTheOfficePana from '../../Assets/img/Forum.png'; 
// import Rectangle from '../Assets/rectangle0.png'; 

const ForumExt = () => {
  return (
    <div className="div-1">
      <div className="component-1">
        <img className="at-the-office-pana-1" src={AtTheOfficePana} alt="At the office" />
        <div className="bienvenue-dans-l-2-i-forum">
          Bienvenue,
          <br />
          dans L2i-Forum
          <br />
        </div>
        {/* <div className="rectangle-7"></div> */}
        {/* <img className="rectangle" src={Rectangle} alt="Rectangle" /> */}
      </div>
    </div>
  );
};

export default ForumExt;
