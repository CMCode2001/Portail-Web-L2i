import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "../../../Styles/stats.css";
import { SERVER_URL } from "../../../constantURL";

function Stats() {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await fetch(
          SERVER_URL + "/curentListStudent/totalStudent"
        );
        const data = await response.json();
        setTotalStudents(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total d'étudiants:",
          error
        );
      }
    };

    fetchTotalStudents();
  }, []);

  return (
    <div className="stats">
      <div className="chiffres">
        <div className="chiffre">
          <i className="fa-solid fa-user-graduate"></i>
          <div className="chiffre-content">
            <h4>
              +<CountUp end={totalStudents} duration={5} />
            </h4>
            <p>Etudiants</p>
          </div>
        </div>
        <div className="chiffre">
          <i className="fa-solid fa-chalkboard-user"></i>
          <div className="chiffre-content">
            <h4>
              <CountUp end={17} duration={5} />
            </h4>
            <p>Professeurs Titulaires</p>
          </div>
        </div>
        <div className="chiffre">
          <i className="fa-solid fa-graduation-cap"></i>
          <div className="chiffre-content">
            <h4>
              <CountUp end={32} duration={5} />
            </h4>
            <p>Diplômés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
