import React from 'react';
import MaquetteL3Image from '../../Assets/img/Maquette-L3.png'; 
import '../../Styles/MaquetteL3.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import HeaderBlock from '../Header/HeaderBlock';

export default function MaquetteL3() {
  return (
    <>
    <HeaderBlock/>
    <div className="back-button-container">
        <Link to="/maquette" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> 
        </Link>
      </div>
    <h1 style={{textAlign:'center', paddingTop:'10px'}}> Maquette Licence 3</h1>
    <div className="maquettel3-container">
      <img src={MaquetteL3Image} alt="Maquette Licence 3" className="maquette-image" />
    </div>
    </>
  );
}
