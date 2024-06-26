import React from 'react';
import Card from './CardFutureEtudiant';
import './Styles/CardsContainer.css';
import check1 from '../../../../../Assets/img/checkFTEtudiant.png';
import check2 from '../../../../../Assets/img/checkFTEtudiant.png';
import check3 from '../../../../../Assets/img/checkFTEtudiant.png';

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
      image: check2,
    },
    {
      title: 'Formation Payante',
      description: `La Licence en Ingénierie Informatique propose une formation de qualité à travers un programme payant. Les frais de scolarité couvrent divers aspects essentiels de l’éducation, incluant l’accès aux ressources pédagogiques avancées.`,
      image: check3,
    },
  ];

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          image={card.image}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
