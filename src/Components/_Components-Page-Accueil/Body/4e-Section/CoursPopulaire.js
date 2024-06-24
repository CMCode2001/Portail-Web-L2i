import React from 'react'
import '../../../../Styles/CoursPopulaire.css';


 import s from "../../../../Assets/img/istockphoto-1356364268-612x612.jpg";
import d from "../../../../Assets/img/Capture d’écran du 2024-06-14 16-30-40.png";
import a from "../../../../Assets/img/Base-donnee-relationelle.jpg";
import f from "../../../../Assets/img/ReseauTelecom-scaled.jpg";
//import e from "../../../../Assets/img/securite_informatique-scaled-1-1.jpg";
import g from "../../../../Assets/img/systemes-exploitation-information-informatique.jpg";
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';
import CoursCard from './CoursCard';

export default function CoursPopulaire() {
  return (

    <div className='containerCours'>
      <div className='team_container'>
        <SeparatorBlock title="Cours Populaire"/>
      </div>

      <div className='row'>
        <CoursCard
          image={s}
          title="Algorithme"
          description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit"
        />

        <CoursCard 
            image={d} 
            title="Programmation" 
            description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit" 
        />
        <CoursCard 
            image={a} 
            title="Base de donnée" 
            description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit" 
        />
        <CoursCard 
            image={f} 
            title="Réseau & Télécom" 
            description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit" 
        />
        <CoursCard 
            image={g} 
            title="Sécurité Informatique" 
            description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit" 
        />
        <CoursCard 
            image={g} 
            title="Système D'exploitation" 
            description="Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit" 
        />

      </div>
    </div>

  );
}
