import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, FormGroup, Label, Input, } from "reactstrap"
import Axios from 'axios';


const Login = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
      setIsOpen(true);
    };

    const hideModal = () => {
      setIsOpen(false);
    };

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
 
    

    const login = () => {
      Axios.post("http://localhost:3001/login", {
        username: username, 
        password: password,
      }).then((response) => {
        if (response.data.message) {
            setLoginStatus(response.data.message)
        }else {
          setLoginStatus(response.data[0].username)
        }
        
      });
      hideModal();
    };

    const [ loginStatus, setLoginStatus ] = useState("");

    const oak = require("/Users/popi/pokeblog/src/assets/profesoroak.jpg")

  return (
    <>
      <div className="row">
          <div className="col-7" style={styles.nombre}>
              ¡Bienvenidx {loginStatus}! ¿Qué Pokémones viste hoy?
          </div>
          <div className="col-4">
              <img src={oak} alt={username} style={styles.fotoPerfil} />
          </div>
      </div>
 

      <button onClick={showModal} type="button" className="btn btn-success">Ingresar</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Ingresa a PokéBlog!</Modal.Title>
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
                    setUsername(e.target.value);
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
                    setPassword(e.target.value);
                  }}
                />
              </FormGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} type="button" className="btn btn-danger">Cancelar</button>
          <button onClick={login} type="button" className="btn btn-success">Ingresar</button>
        </Modal.Footer>

        
      </Modal>
    </>
  );
};

export default Login;

const styles = {
  fotoPerfil: {
      border: "2px solid #dfdfdf",
      borderRadius:"50px",
      marginTop:"15px",
      marginBottom:"15px",
      height:"100px"
  },

  nombre: {
      padding: "10px",
      paddingTop: "25px",
      backgroundColor: "#fff",
      marginLeft: "20px",
      borderRadius: "10px 0px 10px 10px",
      border: "1px solid #dfdfdf",
      textAlign: "center",
      marginTop:"15px",
      marginBottom:"15px",
      fontFamily:"Comfortaa",
  }
  
};