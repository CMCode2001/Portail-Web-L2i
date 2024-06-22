import React from 'react';
import Para from './1e-Section/Parallax';
import Apropos from "./2e-Section/Apropos";
import DecouvrerIngenierieInfo from "./3e-Section/DecouvrerIngenierieInfo";
import CoursPopulaire from "./4e-Section/CoursPopulaire";
import NosPartenaires from "./6e-Section/NosPartenaires";

function BodyBlock () {
  return (
    <>
      <Para/>
      <br/> <p>------------------------</p>
      <Apropos/>
      <br/> 
      <DecouvrerIngenierieInfo/>
      <br/>
      <CoursPopulaire/>
      <br/> 
      {/* <FutureEtudiant/> */}
      <br/> 
      <NosPartenaires/>
      <br/>

    </>
  )
}

export default BodyBlock;