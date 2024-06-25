import React from 'react';
import Para from './1e-Section/Parallax';
import Apropos from "./2e-Section/Apropos";
import DecouvrerIngenierieInfo from "./3e-Section/DecouvrerIngenierieInfo";
import CoursPopulaire from "./4e-Section/CoursPopulaire";
import NosPartenaires from "./6e-Section/NosPartenaires";
import FutureEtudiant from './5e-Section/FutureEtudiant';

function BodyBlock () {
  return (
    <>
      <Para/>
      <br/>
      <Apropos/>
      <br/> 
      <DecouvrerIngenierieInfo/>
      <br/>
      <CoursPopulaire/>
      <br/> 
      <FutureEtudiant/>
      <br/> 
      <br/> 
      <NosPartenaires/>
      <br/>

    </>
  )
}

export default BodyBlock;