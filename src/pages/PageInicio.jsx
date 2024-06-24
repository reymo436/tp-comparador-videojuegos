// src/pages/PageInicio.jsx

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const PageInicio = () => {
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videojuegos')
      .then(response => {
        setVideojuegos(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the videojuegos!', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-5">Nuestros Videojuegos</h1>
      <Row xs={1} md={3} className="g-4">
        {videojuegos.map(videojuego => (
          <Col key={videojuego._id}>
            <Card className="h-100">
              <Card.Img variant="top" src={videojuego.imagen || 'https://via.placeholder.com/150'} />
              <Card.Body className='cuerpoTabla'>
                <Card.Title>{videojuego.nombre}</Card.Title>
                <Card.Text>
                  <strong>Año:</strong> {videojuego.anno}<br />
                  <strong>Precio:</strong> ${videojuego.precio}
                </Card.Text>
                {/* Botón para comparar */}
                <Link to={`/comparar/${videojuego._id}`}>
                  <Button variant="primary">
                    Comparar
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PageInicio;
