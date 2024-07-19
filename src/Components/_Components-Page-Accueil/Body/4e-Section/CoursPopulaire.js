import React from 'react';
import '../../../../Styles/CoursPopulaire.css';

import a from "../../../../Assets/img/Algorithme.jpeg";
import b from "../../../../Assets/img/Programmation.jpeg";
import c from "../../../../Assets/img/Base de donnee.jpeg";
import d from "../../../../Assets/img/Reseaux & Telecom.jpeg";
import e from "../../../../Assets/img/Securite Informatique.jpeg";
import f from "../../../../Assets/img/Systeme.png";
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

const cardsData = [
  {
    imgSrc: a,
    title1: 'Algorithmes',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-1'
  },
  {
    imgSrc: b,
    title1: 'Programmation',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-2'
  },
  {
    imgSrc: c,
    title1: 'Base de Données',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-3'
  },
  {
    imgSrc: d,
    title1: 'Réseaux & Télécom',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-4'
  },
  {
    imgSrc: e,
    title1: 'Sécurite Informatique',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-5'
  },
  {
    imgSrc: f,
    title1: 'Système Dexploitation',
    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    imgClass: 'card-img-6'
  },
];

const Courspopulaire = () => {
  return (
    <div className="container">
      <div className='team_container'>
        <SeparatorBlock title="Cours Populaires" />
      </div>
      <div className="row">
        {cardsData.map((card, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-2" key={index}>
            <div className="card" style={{ width: '82%', borderRadius:'33px', backgroundColor:'#13798C'}}>
              <img className={`card-img-top ${card.imgClass}`} src={card.imgSrc} alt={`Card image cap ${index + 1}`} />
              <div className="card-body">
                <h5 className="card-title1" style={{color: '#ffffff', padding:'20px'}}>{card.title1}</h5>
                <p className="card-text">{card.text}</p>
                <a href="#" className="btn btn-boutton ">Voir Plus..</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courspopulaire;
