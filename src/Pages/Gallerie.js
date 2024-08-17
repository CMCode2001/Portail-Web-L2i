import React, { useEffect, useState } from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import GallerieIMG from "../Assets/img/online-gallery-animate (1).svg";
import "../Styles/Gallerie.css";
import FooterBlock from "../Components/Footer/FooterBlock";
import DevTeamComponent from "../Components/_Components-Page-Gallerie/DevTeamComponent";
import axios from "axios";
import { SERVER_URL } from "../constantURL";
import { Image } from "antd";

export default function Gallerie() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    axios
      .get(SERVER_URL + "/picture")
      .then((response) => setPictures(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des images", error)
      );
  }, []);

  return (
    <div>
      <HeaderBlock />
      <div className="gallerie-container">
        {/* <img src={GallerieIMG} alt="SVG-Gallerie" width={700} height={400} /> */}
        <h1 className="gallerie-text">Bienvenue sur L2i Gallerie</h1>
      </div>
      <DevTeamComponent />

      {/* <div className="pictures-grid"> */}
      <div className="pictures-grid-defunt">
        {pictures.slice(0, 2).map((picture) => (
          <div key={picture.id} style={{ marginBottom: "20px" }}>
            <Image
              width={350}
              src={SERVER_URL + picture.url}
              alt={picture.description}
            />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <div className="pictures-grid">
        {/* <div className="pictures-grid-chef"> */}
        {pictures.slice(2, 5).map((picture) => (
          <div key={picture.id} style={{ marginBottom: "20px" }}>
            <Image
              width={350}
              src={SERVER_URL + picture.url}
              alt={picture.description}
            />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <div className="pictures-grid">
        {/* <div className="pictures-grid-team"> */}
        {pictures.slice(5, 10).map((picture) => (
          <div key={picture.id} style={{ marginBottom: "20px" }}>
            <Image
              width={320}
              src={SERVER_URL + picture.url}
              alt={picture.description}
            />
          </div>
        ))}
      </div>
      {/* <div className="pictures-grid">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i}>
              {pictures
                .slice(
                  i * Math.ceil(pictures.length / 4),
                  (i + 1) * Math.ceil(pictures.length / 4)
                )
                .map((picture) => (
                  <div key={picture.id}>
                    <img
                      src={SERVER_URL + picture.url}
                      alt={picture.description}
                    />
                    <p>{picture.description}</p>
                  </div>
                ))}
            </div>
          ))}
      </div> */}

      <div className="pictures-grid">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i}>
              {pictures
                .slice(
                  i * Math.ceil(pictures.length / 4),
                  (i + 1) * Math.ceil(pictures.length / 4)
                )
                .map((picture) => (
                  <div key={picture.id} style={{ marginBottom: "20px" }}>
                    <Image
                      width={350}
                      src={SERVER_URL + picture.url}
                      alt={picture.description}
                    />
                    {/* <p>{picture.description}</p> */}
                  </div>
                ))}
            </div>
          ))}
      </div>

      <FooterBlock />
    </div>
  );
}
