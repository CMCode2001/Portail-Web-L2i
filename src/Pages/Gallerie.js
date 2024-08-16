import React, { useEffect, useState } from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import GallerieIMG from "../Assets/img/online-gallery-animate (1).svg";
import "../Styles/Gallerie.css";
import FooterBlock from "../Components/Footer/FooterBlock";
import DevTeamComponent from "../Components/_Components-Page-Gallerie/DevTeamComponent";
import axios from "axios";
import { SERVER_URL } from "../constantURL";

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

      <div className="pictures-grid">
        {pictures.slice(0, 2).map((picture) => (
          <div key={picture.id}>
            <img src={SERVER_URL + picture.url} alt={picture.description} />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <div className="pictures-grid">
        {pictures.slice(2, 5).map((picture) => (
          <div key={picture.id}>
            <img src={SERVER_URL + picture.url} alt={picture.description} />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <div className="pictures-grid">
        {pictures.slice(5, 10).map((picture) => (
          <div key={picture.id}>
            <img src={SERVER_URL + picture.url} alt={picture.description} />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <div className="pictures-grid">
        {pictures.slice(10).map((picture) => (
          <div key={picture.id}>
            <img src={SERVER_URL + picture.url} alt={picture.description} />
            <p>{picture.description}</p>
          </div>
        ))}
      </div>

      <FooterBlock />
    </div>
  );
}
