import React from 'react'
import MaquettesL2i from '../Components/_Components-Page-Maquette/MaquettesL2i'
import HeaderBlock from '../Components/Header/HeaderBlock'
import FooterBlock from '../Components/Footer/FooterBlock'

export default function Maquette() {
  return (
    <>   
    <HeaderBlock/>
      <div id='MaquetteBody' style={{backgroundColor:'#fff'}}>
          <MaquettesL2i/>
          <FooterBlock/>
      </div>
    </>
  )
}
