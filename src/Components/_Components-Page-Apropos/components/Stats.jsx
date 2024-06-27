import React from "react";
import CountUp from 'react-countup';
import "../../../Styles/stats.css";

function Stats() {
  return (
    <div className="stats">
      <div className="chiffres">
        <div className="chiffre">
          <i class="fa-solid fa-user-graduate"></i>
          <div className="chiffre-content">
            <h4>+<CountUp end={150} duration={5}/></h4>
            <p>Etudiants</p>
          </div>
        </div>
        <div className="chiffre">
          <i class="fa-solid fa-chalkboard-user"></i>
          <div className="chiffre-content">
            <h4><CountUp end={17} duration={5} /></h4>
            <p>Professeurs Titulaire</p>
          </div>
        </div>
        <div className="chiffre">
          <i class="fa-solid fa-graduation-cap"></i>
          <div className="chiffre-content">
            <h4><CountUp end={32} duration={5} /></h4>
            <p>Diplomes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
