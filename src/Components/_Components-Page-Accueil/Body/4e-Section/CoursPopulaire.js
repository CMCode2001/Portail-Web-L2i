import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

import a from "../../../../Assets/img/Algorithme.jpeg";
import b from "../../../../Assets/img/Programmation.jpeg";
import c from "../../../../Assets/img/Base de donnee.jpeg";
import d from "../../../../Assets/img/Reseaux & Telecom.jpeg";
import e from "../../../../Assets/img/Securite Informatique.jpeg";
import f from "../../../../Assets/img/Systeme.png";

const cardsData = [
  {
    title: 'Algorithmes',
    image: a,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 30px 0 90px',
  },
  {
    title: 'Programmation',
    image: b,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 20px 0 0',
  },
  {
    title: 'Bases de Donnees',
    image: c,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 30px 90px 0',
  },
  {
    title: 'Reseaux & Telecom',
    image: d,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 30px 0 90px',
  },
  {
    title: 'Securite Informatique',
    image: e,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 20px 0 0',
  },
  {
    title: 'Systeme Dexploitation',
    image: f,
    description: 'Tempor erat elitr rebum chez clita. Diamdolor diam ipsum assis. Aliqu diam ametdiam et eos. Clita erat ipsum et lorem et sit,sed stet lorem sit clita duo justo magnadolore erat amet',
    borderRadius: '30px 30px 90px',
  },
];

const MyCards = () => {
  
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/cours');
    console.log("Parenaathi !!!");
    
  }

    return (
    <Container>
      <SeparatorBlock title="Cours Populaires" />
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh', marginTop: '20px' }}>
        <Grid container item xs={12} spacing={3} justifyContent="center">
          {cardsData.slice(0, 3).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
              <Card sx={{ 
                borderRadius: '33px', 
                width: '341px', 
                height: '473px',
                backgroundColor: '#13798C',
              }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={card.image}
                  alt={card.title}
                  sx={{ borderRadius: card.borderRadius }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      position: 'relative',
                      paddingLeft: '40px',
                      color: 'white',
                      fontWeight: 'bold',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                  >
                    {card.description}
                  </Typography>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'white',
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: '33px',
                      display: 'block', 
                      margin: '16px auto',
                      transition: 'background-color 0.3s, color 0.3s',
                      '&:hover': {
                        backgroundColor: '#d3d3d3', // Couleur blanche foncée
                        color: 'black',
                      },
                      '&:active': {
                        backgroundColor: '#b3b3b3', // Couleur blanche foncée encore plus intense
                        color: 'black',
                      }
                    }}
                  >
                    Voir plus
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={3} justifyContent="center">
          {cardsData.slice(3, 6).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
              <Card sx={{ 
                borderRadius: '33px', 
                width: '341px', 
                height: '473px',
                backgroundColor: '#13798C',
              }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={card.image}
                  alt={card.title}
                  sx={{ borderRadius: card.borderRadius }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      position: 'relative',
                      paddingLeft: '40px',
                      color: 'white',
                      fontWeight: 'bold',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white"
                  >
                    {card.description}
                  </Typography>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'white',
                      color: 'black',
                      fontWeight: 'bold',
                      borderRadius: '33px',
                      display: 'block', 
                      margin: '16px auto',
                      transition: 'background-color 0.3s, color 0.3s',
                      '&:hover': {
                        backgroundColor: '#d3d3d3', // Couleur blanche foncée
                        color: 'black',
                      },
                      '&:active': {
                        backgroundColor: '#b3b3b3', // Couleur blanche foncée encore plus intense
                        color: 'black',
                      }
                    }}
                  >
                    Voir plus
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyCards;
