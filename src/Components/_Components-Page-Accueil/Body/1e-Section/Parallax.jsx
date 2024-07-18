import { React, useEffect, useRef } from "react";
import { Parallax } from "react-parallax";
import Typewriter from "typewriter-effect/dist/core";
import image from "../../../../Assets/img/Graduation.png";
import "../../../../Styles/Parallax.css";

const Para = () => {
  const typewriterRef = useRef(null);
  useEffect(() => {
    typewriterRef.current = new Typewriter("#typewriter", {
      strings: [
        "La meilleure filière d'informatique du Sénégal",
        "Rejoignez-nous pour une carrière brillante",
      ],
      autoStart: true,
      loop: true, // Added for continuous typing
    });

    typewriterRef.current.start();
  }, []);
  return (
    <Parallax
      bgImage={image}
      strength={500}
      bgImageStyle={{ minHeight: "100%", width: "100%", objectFit: "cover" }}
    >
      <div className="parallax-container">
        <div className="parallax-content">
          {/* <div className="logos">
                        <img src={uniLogo} alt="Logo de l'université" className="logo" />
                        <img src={filiereLogo} alt="Logo de la filière" className="logo" />
                    </div> */}
          <h1>Votre filière informatique</h1>
          <p id="typewriter"></p>
        </div>
      </div>
    </Parallax>
  );
};

export default Para;
