import React from 'react';
import '../../../../Styles/CoursPopulaire.css';
import a from "../../../../Assets/img/Algorithme.jpeg";
import p from "../../../../Assets/img/Programmation.jpeg";
import b from "../../../../Assets/img/Base de donnee.jpeg";
import RT from "../../../../Assets/img/Reseaux & Telecom.jpeg";
import S from "../../../../Assets/img/Securite Informatique.jpeg";
import SE from "../../../../Assets/img/Systeme d'Exploitation.jpeg";
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

export default function CoursPopulaire() {
  const courses = [
    { image: a, title: "Algorithme", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'algorithme' },
    { image: p, title: "Programmation", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'programmation' },
    { image: b, title: "Base de donnée", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'base-de-donnee' },
    { image: RT, title: "Réseau & Télécom", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'reseau-telecom' },
    { image: S, title: "Sécurité Informatique", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'securite-informatique' },
    { image: SE, title: "Système D'exploitation", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'systeme-exploitation' }
  ];

  return (
    <div className='containerCours'>
      <div className='team_container'>
        <SeparatorBlock title="Cours Populaires" />
      </div>
      <div className='row'>
        {courses.map((course, index) => (
          <div key={index} className='profile-card'>
            <div className='profile-content'>
              <div className={`profile-image ${course.imageClass}`}>
                <img src={course.image} alt={course.title} className='image' />
              </div>
              <div className='desc'>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>
              <div className='btn-div'>
                <button className='btnVoirPlus'><i className='fa-fa-facebook'></i>Voir Plus..</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
