import React from 'react'
import monSvg from '../../../../Assets/img/innovation-animate.svg';
import '../../../../Styles/AproposSection2.css'
import { Link } from 'react-router-dom';
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';
export default function Apropos() {
  return (
    <div className='container'>
    <SeparatorBlock title="À PROPOS DE NOUS"/>
    {/* <div className="separator"></div> */}
    
    <div className='monContenaire d-flex'>
      
      <div class="monSVG ">
        <img src={monSvg} alt='monSvg' width={500} height={500} className=' responsiveSVG'/>
      </div>
      <br/>
      <div class=" container monBienvenue">
        {/* <h5><b>À PROPOS DE NOUS</b> </h5> */}
        <p style={{textAlign:'justify'}}>
        La Licence Ingénierie Informatique (<b>L2i</b>) de l'Université Assane Seck de Ziguinchor (UASZ) est un programme académique rigoureux et innovant, conçu pour former des professionnels compétents dans le domaine de l'informatique. Ce programme offre une formation complète et approfondie, couvrant divers aspects de l'informatique et des technologies de l'information. <br/>
        En choisissant ce programme, les étudiants s'engagent dans une voie qui les prépare à être des acteurs clés dans la révolution numérique.
      
        </p>
        <ul>
          <li className='Stronger'> 
            Fournir une base solide en mathématiques, en algorithmique et en programmation. 
          </li> 
          <li className='Stronger'> 
            Former les étudiants aux technologies et outils modernes de développement  logiciel.
          </li> 
          <li className='Stronger'> 
            Développer des compétences en analyse, conception et gestion de systèmes informatiques complexes.
          </li> 
          <li className='Stronger'>Concevoir un système informatique(SI) </li> 
          <li className='Stronger'>Développer des applications web /mobiles </li>
          <li className='Stronger'>Administrer des réseaux informatiques</li>
          <li className='Stronger'>Administrer des bases de données</li>
          
        </ul> 
        
        <Link to='/a-propos'>
            <button  id='btnPro1'>En S'avoir plus <i className=" fa fa-arrow-right " style={{width:'12px'}}></i></button>
        </Link>

      </div>
      
    </div>
    </div>
  )
}
