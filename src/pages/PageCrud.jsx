import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AgregarModal from '../components/AgregarModal';
import EditarModal from '../components/EditarModal';
import axios from 'axios';

const PageCrud = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedVideojuego, setSelectedVideojuego] = useState(null);
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videojuegos')
      .then(response => {
        setVideojuegos(response.data);
      })
      .catch(error => {
        console.error('¡Hubo un error al traer los videojuegos!', error);
      });
  }, []);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (videojuego) => {
    setSelectedVideojuego(videojuego);
    setShowEdit(true);
  };

  const handleAdd = (videojuego) => {
    axios.post('http://localhost:5000/api/videojuegos', videojuego)
      .then(response => {
        setVideojuegos([...videojuegos, response.data]);
      })
      .catch(error => {
        console.error('¡Hubo un error al agregar el videojuego!', error);
      });
    handleCloseAdd();
  };

  const handleEdit = (videojuego) => {
    axios.put(`http://localhost:5000/api/videojuegos/${videojuego._id}`, videojuego)
      .then(response => {
        const updatedVideojuegos = videojuegos.map(v =>
          v._id === videojuego._id ? response.data : v
        );
        setVideojuegos(updatedVideojuegos);
      })
      .catch(error => {
        console.error('¡Hubo un error al editar el videojuego!', error);
      });
    handleCloseEdit();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/videojuegos/${id}`)
      .then(() => {
        setVideojuegos(videojuegos.filter(v => v._id !== id));
      })
      .catch(error => {
        console.error('¡Hubo un error al borrar el videojuego!', error);
      });
  };

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Lista de Videojuegos</h1>
      <div className='contenedorBtn text-right mb-3'>
        <Button variant="primary" onClick={handleShowAdd}>Agregar</Button>
      </div>
      <div className='contenedorLista' style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Container fluid>
          <Table striped bordered responsive>
            <thead className='table-dark' style={{ textAlign: 'center' }}>
              <tr>
                <th>Nombre Videojuego</th>
                <th>Año</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {videojuegos.map(videojuego => (
                <tr key={videojuego._id}>
                  <td>{videojuego.nombre}</td>
                  <td>{videojuego.anno}</td>
                  <td>{videojuego.precio}</td>
                  <td style={{ width: '200px' }}>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => handleShowEdit(videojuego)}
                    >
                      Modificar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(videojuego._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      <AgregarModal show={showAdd} handleClose={handleCloseAdd} handleAdd={handleAdd} />
      <EditarModal show={showEdit} handleClose={handleCloseEdit} handleEdit={handleEdit} videojuego={selectedVideojuego} />
    </Container>
  );
}

export default PageCrud;
