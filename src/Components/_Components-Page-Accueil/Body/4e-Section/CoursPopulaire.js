import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import SeparatorBlock from '../../../_Layouts/SeparatorBlock';

import a from "../../../../Assets/img/Algorithme.jpeg";
import b from "../../../../Assets/img/Programmation.jpeg";
import c from "../../../../Assets/img/Base de donnee.jpeg";
import d from "../../../../Assets/img/Reseaux & Telecom.jpeg";
import e from "../../../../Assets/img/Securite Informatique.jpeg";
import f from "../../../../Assets/img/Systeme.png";
import Fade from "react-reveal/Fade";

const cardsData = [
  {
    title: 'Algorithmes',
    image: a,
    description: 'Explorez les fondements des algorithmes, de la conception à l\'optimisation, en résolvant des problèmes complexes à travers des approches efficaces.',
    borderRadius: '30px 30px 0 90px',
  },
  {
    title: 'Programmation',
    image: b,
    description: 'Initiez-vous à la programmation en maîtrisant les langages de base et les concepts essentiels pour développer des applications robustes.',
    borderRadius: '30px 20px 0 0',
  },
  {
    title: 'Bases de Données',
    image: c,
    description: 'Apprenez à concevoir, créer et gérer des bases de données pour stocker et organiser efficacement de grandes quantités d\'informations.',
    borderRadius: '30px 30px 90px 0',
  },
  {
    title: 'Réseaux & Télécom',
    image: d,
    description: 'Découvrez les architectures et technologies des réseaux modernes ainsi que les principes des télécommunications pour un monde interconnecté.',
    borderRadius: '30px 30px 0 90px',
  },
  {
    title: 'Sécurité Informatique',
    image: e,
    description: 'Analysez les menaces numériques et développez des stratégies de défense pour protéger les systèmes d\'information contre les cyberattaques.',
    borderRadius: '30px 20px 0 0',
  },
  {
    title: 'Système d\'Exploitation',
    image: f,
    description: 'Plongez dans les mécanismes des systèmes d\'exploitation, de la gestion des ressources à l\'interaction avec le matériel informatique.',
    borderRadius: '30px 30px 90px',
  },
];

const MyCards = () => {
  

  

    return (
    <Container>
      <SeparatorBlock title="Cours Populaires" />
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh', marginTop: '20px' }}>

        <Grid container item xs={12} spacing={3} justifyContent="center">
          {cardsData.slice(0, 3).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
            <Fade top>
              <Card sx={{ 
                borderRadius: '33px', 
                width: '341px', 
                height: '400px',
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
                    textAlign="left"
                  >
                    {card.description}
                  </Typography>
                  {/* <Button
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
                  </Button> */}
                </CardContent>
              </Card>
            </Fade>
            </Grid>
          ))}
        </Grid>
        <Grid container item xs={12} spacing={3} justifyContent="center">
          {cardsData.slice(3, 6).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
            <Fade bottom>
              <Card sx={{ 
                borderRadius: '33px', 
                width: '341px', 
                height: '400px',
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
                    textAlign="left"

                  >
                    {card.description}
                  </Typography>
                  {/* <Button
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
                  </Button> */}
                </CardContent>
              </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Grid>
              
      <Link to='/cours' style={{textDecoration:'none'}}>      
      <Button
                    variant="contained"
                    sx={{ 
                      backgroundColor: 'white',
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize:'24px',
                      textTransform:'Capitalize',
                      border:'1px solid #6B2239',
                      borderRadius: '33px',
                      width: '13rem',
                      height: '3.3rem',
                      display: 'block', 
                      margin: '20px  auto',
                      textAlign:'center',
                      transition: 'background-color 0.3s, color 0.3s',
                      '&:hover': {
                        backgroundColor: '#6B2239', // Couleur blanche foncée
                        color: 'white',
                      },
                      '&:active': {
                        backgroundColor: '#b3b3b3', // Couleur blanche foncée encore plus intense
                        color: '#6B2239',
                      }
                    }}
                  >
                    Voir plus...
                  </Button>
      </Link>

    </Container>
  );
}

export default MyCards;
