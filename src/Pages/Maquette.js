import React from 'react'
import MaquettesL2i from '../Components/_Components-Page-Maquette/MaquettesL2i'
import HeaderBlock from '../Components/Header/HeaderBlock'

export default function Maquette() {
  return (
    <>   
    <HeaderBlock/>
      <div id='MaquetteBody' style={{backgroundColor:'#eee'}}>
          <MaquettesL2i/>
      </div>
    </>
  )
}
