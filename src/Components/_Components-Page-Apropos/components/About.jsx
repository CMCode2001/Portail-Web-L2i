import React, { useEffect, useState } from 'react';
import logo from '../../../Assets/img/Logo-L2i.png';
import '../../../Styles/About.css';
import Fade from "react-reveal/Fade";


const About = () => {
  const [visibleEllipses, setVisibleEllipses] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const ellipses = document.querySelectorAll('.ellipse');
    ellipses.forEach((ellipse, index) => {
      setTimeout(() => {
        setVisibleEllipses(prev => [...prev, index]);
        if (index === ellipses.length - 1) {
          setTimeout(() => setLogoVisible(true), 300);
        }
      }, index * 300);
    });
  }, []);

  return (
    <div className="about container mt-3 mb-5 d-flex position-relative">
      <div className="about-content col-12 col-md-7">
        <Fade right>
        <h1 className="about-title">
          À propos de notre filière, la  <br /><span className="title-span"> Licence en Ingenierie Informatique</span>
        </h1>
        </Fade>

        <p class="about-text">
        <Fade bottom>
          La filière Informatique de l&#039;Université Assane Seck de Ziguinchor
          est la première filière professionnelle 100% informatique de
          l&#039;université. Notre programme est conçu pour offrir une formation
          complète et rigoureuse, préparant les étudiants à devenir des
          professionnels compétents et innovants dans le domaine de
          l&#039;informatique.
      </Fade>

      </p>
      </div>
      <div className="group-logo col-12 col-md-5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`ellipse ellipse-${index + 1} ${visibleEllipses.includes(index) ? 'visible' : ''}`}
          ></div>
        ))}
        <img src={logo} alt="Logo" className={`logo ${logoVisible ? 'visible' : ''}`} />
      </div>
    </div>
  );
};

export default About;

