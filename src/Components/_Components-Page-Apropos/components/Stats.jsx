import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "../../../Styles/stats.css";
import { SERVER_URL } from "../../../Utils/constantURL";

function Stats() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalOldStudents, setTotalOldStudents] = useState(0);
  const [totalProfessors, setTotalProfessors] = useState(0);

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

  useEffect(() => {
    const fetchTotalOldStudents = async () => {
      try {
        const response = await fetch(
          SERVER_URL + "/curentListStudent/totalOldStudent"
        );
        const data = await response.json();
        setTotalOldStudents(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des anciens étudiants:",
          error
        );
      }
    };

    fetchTotalOldStudents();
  }, []);

  useEffect(() => {
    const fetchTotaProfessors = async () => {
      try {
        const response = await fetch(
          SERVER_URL + "/curentListStudent/totalProfessor"
        );
        const data = await response.json();
        setTotalProfessors(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des professeurs:", error);
      }
    };

    fetchTotaProfessors();
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
              <CountUp end={totalProfessors} duration={5} />
            </h4>
            <p>Professeurs Titulaires</p>
          </div>
        </div>
        <div className="chiffre">
          <i className="fa-solid fa-graduation-cap"></i>
          <div className="chiffre-content">
            <h4>
              <CountUp end={totalOldStudents} duration={5} />
            </h4>
            <p>Diplômés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
