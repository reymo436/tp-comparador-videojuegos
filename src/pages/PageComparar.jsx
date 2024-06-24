import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useParams, Link } from 'react-router-dom';

const PageComparar = () => {
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState(null);
  const [videojuegosMismoPrecio, setVideojuegosMismoPrecio] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchVideojuego = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videojuegos/${id}`);
        setVideojuegoSeleccionado(response.data);
        compararConMismoPrecio(response.data);
      } catch (error) {
        console.error('¡Hubo un error al traer el videojuego seleccionado!', error);
      }
    };

    if (id) {
      fetchVideojuego();
    }
  }, [id]);

  const compararConMismoPrecio = (videojuego) => {
    axios.get(`http://localhost:5000/api/videojuegos/comparar/${videojuego.precio}/${videojuego._id}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setVideojuegosMismoPrecio(response.data);
        } else {
          setVideojuegosMismoPrecio([]);
        }
      })
      .catch(error => {
        console.error('¡Hubo un error al comparar los videojuegos por precio!', error);
        setVideojuegosMismoPrecio([]);
      });
  };

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Comparar Videojuegos</h1>
      {videojuegoSeleccionado && (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <div className='SubtitComparar'>
                  <h5 >Videojuego Seleccionado</h5>
                </div>
                <Card.Title>{videojuegoSeleccionado.nombre}</Card.Title>
                <Card.Text>Año: {videojuegoSeleccionado.anno}</Card.Text>
                <Card.Text>Precio: ${videojuegoSeleccionado.precio}</Card.Text>
                <Card.Img src={videojuegoSeleccionado.imagen} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <div className='SubtitComparar'>
                  <h5>Videojuegos con el mismo Precio</h5>
                </div>
                {videojuegosMismoPrecio.length === 0 ? (
                  <p>No hay videojuegos con el mismo precio.</p>
                ) : (
                  <Table striped bordered responsive>
                    <thead className='table-dark' style={{ textAlign: 'center' }}>
                      <tr>
                        <th>Nombre Videojuego</th>
                        <th>Año</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {videojuegosMismoPrecio.map(videojuego => (
                        <tr key={videojuego._id}>
                          <td>{videojuego.nombre}</td>
                          <td>{videojuego.anno}</td>
                          <td>{videojuego.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <div className="text-center mt-3">
        <Link to="/" className="btn btn-secondary">Volver a Inicio</Link>
      </div>
    </Container>
  );
}

export default PageComparar;
