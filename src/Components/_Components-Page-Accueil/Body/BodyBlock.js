import React from 'react';
import Carroussel from "./1e-Section/Carroussel";
import Apropos from "./2e-Section/Apropos";
import DecouvrerIngenierieInfo from "./3e-Section/DecouvrerIngenierieInfo";
import CoursPopulaire from "./4e-Section/CoursPopulaire";
import FutureEtudiant from "./5e-Section/FutureEtudiant";
import NosPartenaires from "./6e-Section/NosPartenaires";

function BodyBlock () {
  return (
    <>
      <Carroussel/>
      <br/> 
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