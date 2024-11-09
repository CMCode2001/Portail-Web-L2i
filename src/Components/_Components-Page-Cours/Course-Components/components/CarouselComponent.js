import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const items = [
  {
    name: "Retrouver ici tous les cours de la formation",
    image: process.env.PUBLIC_URL + '/pdf_test/istockphoto-1465316262-1024x1024.jpg'
  },
  {
    name: "Utilisez la barre de recherche pour trouver des cours",
    image: process.env.PUBLIC_URL + '/pdf_test/istockphoto-1465316262-1024x1024.jpg'
  },
  {
    name: "Filtrez les cours par niveau et matière",
    image: process.env.PUBLIC_URL + '/pdf_test/istockphoto-1465316262-1024x1024.jpg'
  }
];

function CarouselComponent() {
  return (
    <Carousel>
      {items.map((item, i) => <Item key={i} item={item} />)}
    </Carousel>
  )
}

function Item({ item }) {
  return (
    <Paper>
      <div style={{
        height: "450px",
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "2rem",
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
      }}>
        {item.name}
      </div>
    </Paper>
  )
}

export default CarouselComponent;
