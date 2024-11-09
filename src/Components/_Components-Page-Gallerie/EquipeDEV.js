import React, { useState } from 'react';
import '../../Styles/EquipeDEV.css';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

const EquipeDEV = () => {
  const [current, setCurrent] = useState(1);

  const members = [
    {
      name: 'Seydina Mouhamed Al-Hamine NDIAYE',
      role: 'Chef du developpement Back-End',
      img: './img/Smah.png',
    },
    {
      name: 'Abdoulaye GAYE',
      role: 'Chef de Projet du portail-web L2i',
      img: './img/Laye.png',
    },
    {
      name: 'Cheikh Mbacké COLY',
      role: 'Chef du developpement Front-End',
      img: './img/CMC.jpg',
    },
    {
      name: 'Ousmane NDIEGUENE',
      role: 'Developpeur Back-End',
      img: './img/Mirfou.png',
    },
    {
      name: 'El Abdou DRAME',
      role: 'Developpeur Front-End',
      img: './img/Eadarak.png',
    },
    {
      name: 'Souleymane DIAGNE',
      role: 'Developpeur Front-End',
      img: './img/Jules.png',
    },
    {
      name: 'Mouhamed DIAGNE',
      role: 'Developpeur Front-End',
      img: './img/MhDiagne.png',
    },
  ];

  const handleRightClick = () => {
    setCurrent((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  const handleLeftClick = () => {
    setCurrent((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };

  const getItemClass = (index) => {
    if (index === current) return 'carousel__item carousel__item--main';
    if (index === (current === 0 ? members.length - 1 : current - 1))
      return 'carousel__item carousel__item--left';
    if (index === (current === members.length - 1 ? 0 : current + 1))
      return 'carousel__item carousel__item--right';
    return 'carousel__item';
  };

  return (
    <div className="carousel-container">
      <div className="container carousel">
        {members.map((member, index) => (
          <div key={index} className={getItemClass(index)}>
            <img src={member.img} alt={member.name} />
            <div className="carousel__text">
              <h3>{member.name}</h3>
              <p style={{ color: 'white' }}>{member.role}</p>
            </div>
          </div>
        ))}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="carousel__btns">
          <button className="carousel__btn" onClick={handleLeftClick}>
                <LeftCircleOutlined />
          </button>
          <button className="carousel__btn" onClick={handleRightClick}>
                <RightCircleOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipeDEV;
