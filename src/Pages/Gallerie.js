import React from 'react'
import HeaderBlock from '../Components/Header/HeaderBlock'
import GallerieIMG from '../Assets/img/online-gallery-animate (1).svg'
import '../Styles/Gallerie.css'

export default function Gallerie() {
  return (
    <div>
        <HeaderBlock/>
        <div className="gallerie-container">
            <img src={GallerieIMG} alt="SVG-Gallerie"  width={700} height={400}/>   
            <h1 className="gallerie-text">Bienvenue sur L2i Gallerie</h1> 

       </div>
    </div>
  )
}
