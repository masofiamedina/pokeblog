import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, FormGroup, Label, Input, } from "reactstrap"
import Axios from 'axios'

const Registro = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
      setIsOpen(true);
    }; 

    const hideModal = () => {
      setIsOpen(false);
    };

    const [ usernameReg, setUsernameReg ] = useState("");
    const [ emailReg, setEmailReg ] = useState("");
    const [ passwordReg, setPasswordReg ] = useState("");

    const registrar = () => {
      Axios.post("http://localhost:3001/register", {
        username: usernameReg, 
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response);
      });
      hideModal();
    };


  return (
    <>
      <button onClick={showModal} type="button" className="btn btn-outline-secondary">Registrarme</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Registro de Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <FormGroup>
                <Label for="username">
                  Nombre de Usuario
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text" 
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="correo">
                  Correo Electrónico
                </Label>
                <Input
                  id="correo"
                  name="correo"
                  type="text"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pass">
                  Contraseña
                </Label>
                <Input
                  id="pass"
                  name="pass"
                  type="password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </FormGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} type="button" className="btn btn-danger">Cancelar</button>
          <button onClick={registrar} type="button" className="btn btn-success">Registrar</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Registro;