import React from 'react';
import MaquetteL2Image from '../../Assets/img/Maquette-L2.png'; 
import '../../Styles/MaquetteL2.css'; 
import HeaderBlock from '../Header/HeaderBlock';

export default function MaquetteL2() {
  return (
    <>
    <HeaderBlock/>
    <div className="maquettel2-container">
      <img src={MaquetteL2Image} alt="Maquette Licence 2" className="maquette-image" />
    </div>
    </>
  );
}
