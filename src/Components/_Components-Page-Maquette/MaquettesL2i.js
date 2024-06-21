
import React from 'react';
import '../../Styles/MaquettesL2i.css';
import BlogCard from './BlogCard';
import MaquetteL1 from '../../Assets/img/Maquette-L1.png';
import MaquetteL2 from '../../Assets/img/Maquette-L2.png';
import MaquetteL3 from '../../Assets/img/Maquette-L3.png';
import Excel from '../../Assets/img/office365.png'
import MaquetteComplete from '../../Assets/Files/Maquette Proposée Licence Informatique UASZ_pleniere.xlsx'
import { Link } from 'react-router-dom';

export default function MaquettesL2i() {
  return (
    <div> 
      <br/>
      <h1 style={{textAlign:'center'}}> 
          <b>Maquettes L2i</b> 
      </h1> 
      <h4 style={{textAlign:'center'}}>
        Télécharger la maquette complète au fichier excel &nbsp; 
       <a href={MaquetteComplete} download="Maquette Proposée L2i-UASZ">
           <img src={Excel} alt="Download" width={40} height={40} />
         </a>
      </h4>

      <div className="maquettes-container">
        <Link to='/maquette-L1' style={{textDecoration:'none', color:'black'}}>  
          <BlogCard 
            image={MaquetteL1} 
            title="Maquette Licence 1" 
            description="Programme détaillé des enseignements de la 1er année. Licence Ingénierie Informatique : L1-2i"
          />
        </Link>

       <Link to='/maquette-L2' style={{textDecoration:'none', color:'black'}}>
        <BlogCard 
            image={MaquetteL2} 
            title="Maquette Licence 2" 
            description="Programme détaillé des enseignements de la 2ème année. Licence Ingénierie Informatique : L2-2i"
          />
       </Link>

       <Link to='/maquette-L3' style={{textDecoration:'none', color:'black'}}>
          <BlogCard 
            image={MaquetteL3} 
            title="Maquette Licence 3" 
            description="Programme détaillé des enseignements de la 3ème année. Licence Ingénierie Informatique : L3-2i"
          />
        </Link>

      </div>
    </div>
  );
}

