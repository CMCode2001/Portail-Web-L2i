import React from 'react';
import Card from './CardFutureEtudiant';
import './Styles/CardsContainer.css';
import check1 from '../../../../../Assets/img/check 1.png';
import PDFProspectus from '../../../../../Assets/Files/Prospectus LicenceIngénierieInformatique-L2I.pdf'
const CardsContainer = () => {
  const cardsData = [
    {
      title: 'Admission',
      description: `La Licence en Ingénierie Informatique est conçue pour former des professionnels compétents dans le domaine de l'informatique. Voici les conditions d'admission pour ce programme `,
      image: check1,
    },
    {
      title: 'Débouchés',
      description: `La Licence en Ingénierie Informatique offre une multitude de débouchés professionnels dans le domaine de l'informatique. Les diplômés peuvent se lancer dans diverses carrières.`,
      image: check1,
    },
    {
      title: 'Formation Payante',
      description: `La Licence en Ingénierie Informatique propose une formation de qualité à travers un programme payant. Les frais de scolarité couvrent divers aspects essentiels de l’éducation, incluant l’accès aux ressources pédagogiques avancées.`,
      image: check1,
    },
  ];

  return (
    
    <div className="cards-container ">
     <a href={PDFProspectus}  target='_blank' id='nioudiouksi' rel="noreferrer">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
      </a>
    </div>
  );
};

export default CardsContainer;
