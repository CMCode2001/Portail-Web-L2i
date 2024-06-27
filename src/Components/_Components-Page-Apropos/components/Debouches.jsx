import React, { useEffect, useState } from 'react';
import question from '../../../Assets/svg/question.svg';
import '../../../Styles/debouches.css';

const Debouches = () => {
    const [visibleItems, setVisibleItems] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleItems(prev => (prev < 7 ? prev + 1 : prev)); // 7 est le nombre total d'éléments dans la liste
        }, 500); // Changez le délai en millisecondes selon vos besoins

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="debouches container">
            <div className='debouche-content'>
                <h2>Quel avenir pour moi?</h2>
                <p>Ne paniquez pas, cette formation ouvre la porte à de nombreuses carrières comme :</p>
                <ul className="debouche-list">
                    {visibleItems > 0 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Développeur de logiciels</p>
                        </li>
                    )}
                    {visibleItems > 1 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Ingénieur réseau</p>
                        </li>
                    )}
                    {visibleItems > 2 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Développeur web / Developpeur Mobile</p>
                        </li>
                    )}
                    {visibleItems > 3 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Consultant en informatique</p>
                        </li>
                    )}
                    {visibleItems > 4 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Administrateur de systèmes</p>
                        </li>
                    )}
                    {visibleItems > 5 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Administrateur en Base de donnees</p>
                        </li>
                    )}
                    {visibleItems > 6 && (
                        <li className="debouche">
                            <i className="fa-solid fa-arrow-right"></i>
                            <p>Chef de Projet Informatique</p>
                        </li>
                    )}
                </ul>
            </div>
            <img src={question} alt="Question Svg" className='question-svg' />
        </div>
    );
};

export default Debouches;
