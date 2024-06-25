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
  const [videojuegosComparados, setVideojuegosComparados] = useState([]);
  const [videojuegosSinSimilitudNombre, setVideojuegosSinSimilitudNombre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchVideojuego = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videojuegos/${id}`);
        setVideojuegoSeleccionado(response.data);
        compararVideojuegos(response.data);
        compararVideojuegosSinSimilitudNombre(response.data);
      } catch (error) {
        setError('¡Hubo un error al traer el videojuego seleccionado!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideojuego();
    }
  }, [id]);

  const compararVideojuegos = async (videojuego) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/videojuegos/comparar/${videojuego.nombre}/${videojuego._id}`);
      if (Array.isArray(response.data)) {
        setVideojuegosComparados(response.data);
      } else {
        setVideojuegosComparados([]);
      }
    } catch (error) {
      setError('¡Hubo un error al comparar los videojuegos!');
      console.error(error);
      setVideojuegosComparados([]);
    }
  };

  const compararVideojuegosSinSimilitudNombre = async (videojuego) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/videojuegos/comparar-sin-nombre/${videojuego.precio}/${videojuego._id}/${videojuego.nombre}`);
      if (Array.isArray(response.data)) {
        setVideojuegosSinSimilitudNombre(response.data);
      } else {
        setVideojuegosSinSimilitudNombre([]);
      }
    } catch (error) {
      setError('¡Hubo un error al comparar los videojuegos sin similitud en el nombre!');
      console.error(error);
      setVideojuegosSinSimilitudNombre([]);
    }
  };

  if (loading) {
    return <Container><p>Cargando...</p></Container>;
  }

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Comparar Videojuegos</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {videojuegoSeleccionado && (
        <>
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <div className='SubtitComparar'>
                    <h5>Videojuego Seleccionado</h5>
                  </div>
                  <Card.Title>{videojuegoSeleccionado.nombre}</Card.Title>
                  <Card.Text>Año: {videojuegoSeleccionado.anno}</Card.Text>
                  <Card.Text>Precio: ${videojuegoSeleccionado.precio}</Card.Text>
                  <Card.Img src={videojuegoSeleccionado.imagen} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <div className='SubtitComparar'>
                    <h5>Videojuegos Comparados</h5>
                  </div>
                  {videojuegosComparados.length === 0 ? (
                    <p>No hay otros videojuegos con similitud en el nombre.</p>
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
                        {videojuegosComparados.map(videojuego => (
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
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <div className='SubtitComparar'>
                    <h5>Opciones con un precio similiar a lo que estas buscando</h5>
                  </div>
                  {videojuegosSinSimilitudNombre.length === 0 ? (
                    <p>No hay opciones con un precio similar al que estabas buscando.</p>
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
                        {videojuegosSinSimilitudNombre.map(videojuego => (
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
        </>
      )}
      <div className="text-center mt-3">
        <Link to="/" className="btn btn-secondary">Volver a Inicio</Link>
      </div>
    </Container>
  );
};

export default PageComparar;

