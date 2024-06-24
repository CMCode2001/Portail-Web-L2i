import React from 'react';
import '../../../../Styles/CoursPopulaire.css';
import s from "../../../../Assets/img/istockphoto-1356364268-612x612.jpg";
import d from "../../../../Assets/img/Capture d’écran du 2024-06-14 16-30-40.png";
import a from "../../../../Assets/img/Base-donnee-relationelle.jpg";
import f from "../../../../Assets/img/ReseauTelecom-scaled.jpg";
import g from "../../../../Assets/img/systemes-exploitation-information-informatique.jpg";
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

export default function CoursPopulaire() {
  const courses = [
    { image: s, title: "Algorithme", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'algorithme' },
    { image: d, title: "Programmation", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'programmation' },
    { image: a, title: "Base de donnée", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'base-de-donnee' },
    { image: f, title: "Réseau & Télécom", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'reseau-telecom' },
    { image: g, title: "Sécurité Informatique", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'securite-informatique' },
    { image: g, title: "Système D'exploitation", description: "Tempor erat elitr rebum chez clita. Diam dolor diam ipsum assis. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clit", imageClass: 'systeme-exploitation' }
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
