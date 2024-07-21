import React from 'react'
import HeaderBlock from '../Components/Header/HeaderBlock'
import GallerieIMG from '../Assets/img/online-gallery-animate (1).svg'
import '../Styles/Gallerie.css'
import FooterBlock from '../Components/Footer/FooterBlock'
import EquipeDEV from '../Components/_Components-Page-Gallerie/EquipeDEV'
import DevTeamComponent from '../Components/_Components-Page-Gallerie/DevTeamComponent'

export default function Gallerie() {
  return (
    <div >
         <HeaderBlock/> 
        <div className="gallerie-container">
            <img src={GallerieIMG} alt="SVG-Gallerie"  width={700} height={400}/>   
            <h1 className="gallerie-text">Bienvenue sur L2i Gallerie</h1>
       </div>
       <DevTeamComponent/>

          {/* <EquipeDEV/> */}

       <FooterBlock/> 
    </div>
  )
}
