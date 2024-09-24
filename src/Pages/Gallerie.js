import React, { useEffect, useState } from "react";
import HeaderBlock from "../Components/Header/HeaderBlock";
import GallerieIMG from "../Assets/img/online-gallery-animate (1).svg";
import "../Styles/Gallerie.css";
import FooterBlock from "../Components/Footer/FooterBlock";
import tof from '../Assets/img/firework2.png';
import tof1 from '../Assets/img/graduation-hat-and-diploma.png';
import tofDev from '../Assets/img/web-programming (1).png';
import tofDev1 from '../Assets/img/clapping.png';
import tofDefunt from '../Assets/img/folded.png';
import axios from "axios";
import { SERVER_URL } from "../Utils/constantURL";
import { Button, Card, Image } from "antd";

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

  // Divisez les images en sections
  const defunts = pictures.slice(0, 4); // Les 2 premières images
  const chefsDeveloppeurs = pictures.slice(4, 8); // Les 3 suivantes
  const developpeurs = pictures.slice(8, 16); // Les 5 suivantes
  const autresPhotos = pictures.slice(16); // Le reste des images

  return (
    <div>
      <HeaderBlock />
      <div className="gallerie-container">
        <h1 className="gallerie-text">Bienvenue sur L2i Gallerie</h1>
      </div>

      {/* Centrage du bouton pour la section défunte */}
      <div className="button-container">
        <Button id='Deco1'> 
          <img src={tofDefunt} alt="tofDefunt" id="tofDefunt" />
          Hommages à nos défunts promotionnaires
        </Button>
      </div>

      {/* Section 1 : Hommages à nos défunts promotionnaires */}
      <div className="section">
        <div className="pictures-grid">
          {defunts.map((picture) => (
            <Card
              key={picture.id}
              hoverable
              style={{ width: 350, marginBottom: "20px" }}
              cover={
                <Image
                  src={SERVER_URL + picture.url}
                  alt={picture.description}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
              {picture.description && <Card.Meta description={picture.description} />}
            </Card>
          ))}
        </div>
      </div>

      {/* Centrage du bouton pour la section développeurs */}
      <div className="button-container">
        <Button id='Deco2'>
          <img src={tofDev} alt="les tofs dev" id="tofDev" />
          Bravo ! à nos Développeurs
          <img src={tofDev1} alt="les tofs dev" id="tofDev" />
        </Button>
      </div>

      {/* Section 2 : Chefs Développeurs du projet */}
      <div className="section">
        <div className="pictures-grid">
          {chefsDeveloppeurs.map((picture) => (
            <Card
              key={picture.id}
              hoverable
              style={{ width: 350, marginBottom: "20px" }}
              cover={
                <Image
                  src={SERVER_URL + picture.url}
                  alt={picture.description}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
              {picture.description && <Card.Meta description={picture.description} />}
            </Card>
          ))}
        </div>
      </div>

      {/* Section 3 : Développeurs */}
      <div className="section">
        <div className="pictures-grid">
          {developpeurs.map((picture) => (
            <Card
              key={picture.id}
              hoverable
              style={{ width: 350, marginBottom: "20px" }}
              cover={
                <Image
                  src={SERVER_URL + picture.url}
                  alt={picture.description}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
              {picture.description && <Card.Meta description={picture.description} />}
            </Card>
          ))}
        </div>
      </div>

      {/* Centrage du bouton pour la section Autres */}
      <div className="button-container">
        <Button id='Deco3'> 
          <img src={tof} alt="les tofs" id="tofAutres" />
          Félicitation à la première Promotion L2i
          <img src={tof1} alt="les tofs" id="tofAutres" />
        </Button>
      </div>

      {/* Section 4 : Autres photos */}
      <div className="section">
        <div className="pictures-grid">
          {autresPhotos.map((picture) => (
            <Card
              key={picture.id}
              hoverable
              style={{ width: 350, marginBottom: "20px" }}
              cover={
                <Image
                  src={SERVER_URL + picture.url}
                  alt={picture.description}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              }
            >
            </Card>
          ))}
        </div>
      </div>

      <FooterBlock />
    </div>
  );
}
