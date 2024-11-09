import { React, useEffect, useRef, useState } from "react";
import { Parallax } from "react-parallax";
import Typewriter from "typewriter-effect/dist/core";
import image from "../../../../Assets/img/Graduation.png";
import "../../../../Styles/Parallax.css";
import { SERVER_URL } from "../../../../Utils/constantURL";

const Para = () => {
  const typewriterRef = useRef(null);
  const [data, setData] = useState([]);

  const fetchText = () => {
    fetch(SERVER_URL + "/text")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data text :", error));
  };

  useEffect(() => {
    fetchText();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      typewriterRef.current = new Typewriter("#typewriter", {
        strings: [
          data[0].textDeroulant,
          "Rejoignez-nous pour une carrière brillante",
        ],
        autoStart: true,
        loop: true,
      });

      typewriterRef.current.start();
    }
  }, [data]);

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
          <h1>
            {data.length > 0
              ? data[0].textFiliere
              : "Votre filière informatique"}
          </h1>
          <p id="typewriter"></p>
        </div>
      </div>
    </Parallax>
  );
};

export default Para;
