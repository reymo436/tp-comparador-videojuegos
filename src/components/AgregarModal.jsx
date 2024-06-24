import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AgregarModal = ({ show, handleClose, handleAdd }) => {
  const [nombre, setNombre] = useState('');
  const [anno, setAnno] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = () => {
    handleAdd({ nombre, anno, precio, imagen });
    // Limpiar el formulario
    setNombre('');
    setAnno('');
    setPrecio('');
    setImagen('');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Agregar Videojuego</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Form>
          <Form.Group controlId="formNombre">
            <Form.Label className="form-label-bold">Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formAnno">
            <Form.Label className="form-label-bold">Año</Form.Label>
            <Form.Control
              type="number"
              value={anno}
              onChange={(e) => setAnno(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formPrecio">
            <Form.Label className="form-label-bold">Precio</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
          <Form.Group controlId="formImagen">
            <Form.Label className="form-label-bold">Imagen</Form.Label>
            <Form.Control
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarModal;
