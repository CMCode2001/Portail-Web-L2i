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
      description: 'Lorem Ipsum has been the industry standard for placeholder text. It consists of nonsensical words, allowing designers to focus on layout and design. Originating from the work "de Finibus Bonorum et Malorum" by Cicero, it has evolved over time.',
      image: check1,
    },
    {
      title: 'Débouchés',
      description: 'Lorem Ipsum has been the industry standard for placeholder text. It consists of nonsensical words, allowing designers to focus on layout and design. Originating from the work "de Finibus Bonorum et Malorum" by Cicero, it has evolved over time.',
      image: check2,
    },
    {
      title: 'Formation Payante',
      description: 'Lorem Ipsum has been the industry standard for placeholder text. It consists of nonsensical words, allowing designers to focus on layout and design. Originating from the work "de Finibus Bonorum et Malorum" by Cicero, it has evolved over time.',
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
