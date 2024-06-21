import React from 'react';
import MaquetteL1Image from '../../Assets/img/Maquette-L1.png'; 
import '../../Styles/MaquetteL1.css'; 
import HeaderBlock from '../Header/HeaderBlock';

export default function MaquetteL1() {
  return (
    <>
    <HeaderBlock/>
    <div className="maquettel1-container">
      <img src={MaquetteL1Image} alt="Maquette Licence 1" className="maquette-image" />
    </div>
    </>
  );
}
