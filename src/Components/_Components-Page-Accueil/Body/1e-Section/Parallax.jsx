import React from 'react';
import { Parallax } from 'react-parallax';
import Typical from 'react-typical';
import filiereLogo from '../../../../Assets/img/Logo-L2i.png'; // Remplacez par le chemin réel de votre logo
import uniLogo from '../../../../Assets/img/Partenaires/Partner5.png'; // Remplacez par le chemin réel de votre logo
import image from '../../../../Assets/img/image.jpg';
import '../../../../Styles/Parallax.css';


const Para = () => {
    return (
        <Parallax bgImage={image} strength={500}>
            <div className="parallax-container">
                <div className="parallax-content">
                    {/* <div className="logos">
                        <img src={uniLogo} alt="Logo de l'université" className="logo" />
                        <img src={filiereLogo} alt="Logo de la filière" className="logo" />
                    </div> */}
                    <h1>Votre filière informatique</h1>
                    <Typical
                        steps={['La meilleure filière d\'informatique du Sénégal', 2000, 'Rejoignez-nous pour une carrière brillante', 2000]}
                        loop={Infinity}
                        wrapper="p"
                    />
                    {/* <button className="learn-more">En savoir plus</button> */}
                </div>
            </div>
        </Parallax>
    );
}

export default Para;