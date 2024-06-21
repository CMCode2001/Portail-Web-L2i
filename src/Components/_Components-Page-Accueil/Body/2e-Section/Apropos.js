import React from 'react'
import monSvg from '../../../../Assets/img/innovation-animate.svg';
import '../../../../Styles/AproposSection2.css'
import { Link } from 'react-router-dom';
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';
export default function Apropos() {
  return (
    <>
    <SeparatorBlock title="À PROPOS DE NOUS"/>
    {/* <div className="separator"></div> */}
    
    <div className='monContenaire d-flex'>
      
      <div class="monSVG ">
        <img src={monSvg} alt='monSvg' width={500} height={500} />
      </div>
      <br/>
      <div class="monBienvenue">
        {/* <h5><b>À PROPOS DE NOUS</b> </h5> */}
        <p>
        Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita était ipsum et lorem et assis.
        Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
        Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita était ipsum et lorem et assis.
        Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat ametTempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita était ipsum et lorem et assis.
      
        </p>
        <ul>
          <li className='Stronger'>Concevoir un système informatique(SI) </li> 
          <li className='Stronger'>Développer des applications web /mobiles </li>
          <li className='Stronger'>Administrer des réseaux informatiques</li>
          <li className='Stronger'>Administrer des bases de données</li>
          
        </ul> 
        <Link to='/a-propos'>
            <button  id='btnPro1'>En S'avoir plus <i className="fa fa-arrow-right " style={{width:'12px'}}></i></button>
        </Link>

      </div>
      
    </div>
    </>
  )
}
