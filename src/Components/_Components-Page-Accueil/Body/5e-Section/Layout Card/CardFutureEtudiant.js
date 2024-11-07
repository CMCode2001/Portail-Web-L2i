import React from 'react';
import PropTypes from 'prop-types';
import './Styles/CardFutureEtudiant.css';
import Fade from "react-reveal/Fade";


const CardFutureEtudiant = ({ title, description, image }) => {
  return (
    <>
      <Fade top>
    <div className="card">
      <div className="card-content">
        <img className="card-image" src={image} alt={`${title} icon`} />
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
    </Fade>

    </>

  );
};

CardFutureEtudiant.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardFutureEtudiant;
