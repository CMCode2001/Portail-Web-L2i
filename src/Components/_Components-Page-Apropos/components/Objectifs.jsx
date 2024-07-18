import React from "react";
import icon from '../../../Assets/svg/valid-icon.svg';
import "../../../Styles/Objectifs.css";

function Objectifs() {
  return (
    <div className="objectifs container">
      <h2>
        Nos Missions
      </h2>
      <div className="row mission">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src={icon} alt="icon"  />
            <div className="card-body">
              <h5 className="card-title">Former des professionnels qualifiés</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src={icon} alt="icon"  />
            <div className="card-body">
              <h5 className="card-title">Développer des compétences techniques</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src={icon} alt="icon"  />
            <div className="card-body">
              <h5 className="card-title">Favoriser l'innovation</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card">
            <img src={icon} alt="icon"  />
            <div className="card-body">
              <h5 className="card-title">Préparer a l’insertion professionnelle</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Objectifs;

