import React from 'react';
import logoL2i from '../../Assets/img/Logo-L2i.png';
import './Spinner.css';

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner-wrapper">
      <img src={logoL2i} alt="Logo" className="spinner-logo" />
      <div className="spinner-circle spinner-circle-red"></div>
      <div className="spinner-circle spinner-circle-blue"></div>
    </div>
  </div>
);

export default Spinner;
