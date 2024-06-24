import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditarModal = ({ show, handleClose, handleEdit, videojuego }) => {

  const [nombre, setNombre] = useState('');
  const [anno, setAnno] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    if (videojuego) {
      setNombre(videojuego.nombre);
      setAnno(videojuego.anno);
      setPrecio(videojuego.precio);
      setImagen(videojuego.imagen);
    }
  }, [videojuego]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit({ ...videojuego, nombre, anno, precio, imagen });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Editar Videojuego</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label className="form-label-bold">Nombre del Videojuego</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del videojuego"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formAnno">
            <Form.Label className="form-label-bold">Año</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el año de lanzamiento"
              value={anno}
              onChange={(e) => setAnno(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formPrecio">
            <Form.Label className="form-label-bold">Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formImagen">
            <Form.Label className="form-label-bold">Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen del videojuego"
              value={imagen}
              onChange={e => setImagen(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Modal.Footer className="modal-footer-custom">
            <Button variant="primary" type="submit" className="mt-3">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarModal;
