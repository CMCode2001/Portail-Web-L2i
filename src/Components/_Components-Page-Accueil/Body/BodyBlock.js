import React from 'react';
import Para from './1e-Section/Parallax';
import Apropos from "./2e-Section/Apropos";
import DecouvrerIngenierieInfo from "./3e-Section/DecouvrerIngenierieInfo";
import CoursPopulaire from "./4e-Section/CoursPopulaire";
import FutureEtudiant from "./5e-Section/FutureEtudiant";
import NosPartenaires from "./6e-Section/NosPartenaires";

function BodyBlock () {
  return (
    <>
      <Para/>
      <br/> <p>------------------------</p>
      <Apropos/>
      <br/> <p>------------------------</p>
      <DecouvrerIngenierieInfo/>
      <br/> <p>------------------------</p>
      <CoursPopulaire/>
      <br/> <p>------------------------</p>
      <FutureEtudiant/>
      <br/> <p>------------------------</p>
      <NosPartenaires/>
      <br/> <p>------------------------</p>

    </>
  )
}

export default BodyBlock;