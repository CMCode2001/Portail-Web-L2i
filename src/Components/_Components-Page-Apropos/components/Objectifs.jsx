import React from "react";
import icon from '../../../Assets/svg/valid-icon.svg';
import "../../../Styles/Objectifs.css";

function Objectifs() {
  return (
    <div class="objectifs container">
      <h2>
        Nos Missions
      </h2>
      <div className="mission">
        <div class="card" >
        <img src={icon} alt="icon" />
          <div class="card-body">
            <h5 class="card-title">Former des professionnels qualifiés</h5>
          </div>
        </div>
        <div class="card" >
          <img src={icon} alt="icon" />
          <div class="card-body">
            <h5 class="card-title">Développer des compétences techniques</h5>
          </div>
        </div>
        <div class="card" >
        <img src={icon} alt="icon" />
          <div class="card-body">
            <h5 class="card-title">Favoriser l'innovation</h5>
          </div>
        </div>
        <div class="card" >
        <img src={icon} alt="icon" />
          <div class="card-body">
            <h5 class="card-title">Préparer a l’insertion professionnelle</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Objectifs;
