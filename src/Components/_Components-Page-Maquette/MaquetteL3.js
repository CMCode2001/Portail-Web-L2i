import React from 'react';
import MaquetteL3Image from '../../Assets/img/Maquette-L3.png'; 
import '../../Styles/MaquetteL3.css'; 
import HeaderBlock from '../Header/HeaderBlock';

export default function MaquetteL3() {
  return (
    <>
    <HeaderBlock/>
    <div className="maquettel3-container">
      <img src={MaquetteL3Image} alt="Maquette Licence 3" className="maquette-image" />
    </div>
    </>
  );
}
