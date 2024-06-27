import React from 'react';
import '../../Styles/HeaderForum.css'; 
import Chat from '../../Assets/img/Forum.png'
import office from '../../Assets/svg/on-the-office-animate.svg'
import '../../Styles/HeaderForum.css';

const HeaderForum = () => {
  return (
    <div className="forum-header container">
        <div className="header-forum container">
        <div className="header-message">
        <img className="at-the-office-pana-1" src={Chat} alt="Bulle" />
          <h3 className="bienvenue">
            Bienvenue,<br />
            dans L2i-Forum
          </h3>
        </div>
        <div className='office-div'>
        <img src={office} alt="On the office" className='office' /> 
        </div>
      </div>
    </div>
  );
};

export default HeaderForum;

{/* <div className="comp">
        <div className="rectangle-7"></div>
        <img className="at-the-office-pana-1" src={Chat} alt="Bulle" />
        <div className="bienvenue-dans-l-2-i-forum">
          Bienvenue,dans L2i-Forum
        </div>
        <img className="rectangle" src="rectangle0.png" alt="Rectangle" />
      </div> */}