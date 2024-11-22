import React from 'react';
import Para from './1e-Section/Parallax';
import Apropos from "./2e-Section/Apropos";
import DecouvrerIngenierieInfo from "./3e-Section/DecouvrerIngenierieInfo";
import CoursPopulaire from "./4e-Section/CoursPopulaire";
import NosPartenaires from "./6e-Section/NosPartenaires";
import FutureEtudiant from './5e-Section/FutureEtudiant';
import Fade from "react-reveal/Fade";

function BodyBlock () {
  return (
    <>
    <Fade bottom>
      <Para/>
    </Fade>
      <br/>
    <Fade top>
      <Apropos/>
      <br/> 
    </Fade>
    <Fade opposite>
      <DecouvrerIngenierieInfo/>
      <br/>
      <CoursPopulaire/>
      <br/> 
      <FutureEtudiant/>
      <br/> 
      <br/> 
      </Fade>
      <Fade left>
      <NosPartenaires/>
      <br/>
    </Fade>
    </>
  )
}

export default BodyBlock;