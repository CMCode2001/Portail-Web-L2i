import React from 'react';
import logoL2i from '../../../Assets/img/Logo-L2i.png'; 
import logoUASZ from '../../../Assets/img/Partenaires/Partner5.png';
import '../../../Styles/Navbar-Topbar.css'; 
import { Link } from 'react-router-dom';

const Middlebar = () => {
  return (
    <div className="middlebar-container">
      <Link to='/'>
        <img src={logoL2i} alt="Logo" className="middlebar-logo" width={130}  />
      </Link>
      <div className="middlebar-text">
        <p className="text1">Licence Ingénierie Informatique : L2i</p>
        {/* <p className="text2">Informatique : L2i</p> */}
      </div>
      <img src={logoUASZ} alt="Logo UASZ" className="middlebar-logo" width={130} height={130} />
    </div>
  );
};

export default Middlebar;
