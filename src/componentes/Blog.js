import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, FormGroup, Label, Input, } from "reactstrap"
import Axios from 'axios';
import Card from "react-bootstrap/Card";
import moment from 'moment';

const Blog = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
      setIsOpen(true);
    };
 
    const hideModal = () => {
      setIsOpen(false);
    };

    const [ titulo, setTitulo ] = useState("")
    const [ cover, setCover ] = useState("")
    const [ content, setContent ] = useState("")

    const [postLista, setPostLista] = useState([])

    const subirPost = () => {
        Axios.post("http://localhost:3001/insert", {
          titulo: titulo,
          cover: cover, 
          content: content
        });
        
       setPostLista([
         ...postLista, 
          {titulo: titulo, cover: cover, content: content},
          ]);
        
        hideModal();
    };
    

    useEffect(() => {
      Axios.get('http://localhost:3001/get').then((response) => {
          setPostLista(response.data);
      });
      }, []);

    const borrarPost = (post) => {
        Axios.delete(`http://localhost:3001/delete/${post}`);
    }


  return (
    <>
      <button onClick={showModal} type="button" className="btn btn-outline-danger center" style={{marginBottom:"20px",marginTop:"15px"}}>Escribir Nuevo Post</button>
      <Modal show={isOpen} onHide={hideModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Escribir Nuevo Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <FormGroup>
                <Label for="title">
                  Título del Post
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Nombre del Post"
                  type="text" 
                  onChange={(e) => {
                    setTitulo(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="cover">
                  Cover
                </Label>
                <Input
                  id="cover"
                  name="cover"
                  placeholder="URL de la imagen"
                  type="text"
                  onChange={(e) => {
                    setCover(e.target.value)
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">
                  Contenido del Post
                </Label>
                <Input
                  id="content"
                  name="content"
                  type="textarea"
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                />
              </FormGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal} type="button" className="btn btn-danger">Cancelar</button>
          <button onClick={subirPost} type="button" className="btn btn-success">Registrar</button>
        </Modal.Footer>
      </Modal>
      
      {postLista.map((val)=> {
        //const fecha = moment({val.fecha_post}).format('DD MMM, YYYY');

        return (
            <Card style={{marginBottom:"20px"}}><Card.Img variant="top" src={val.cover_post} />
            <Card.Body>
                <Card.Title>{val.titulo_post}</Card.Title>
                <div style={styles.autor}>usuario</div>
                <Card.Text style={{textAlign:"justify"}}>{val.cuerpo_post}<div style={styles.fecha}>{val.fecha_post}</div>
                </Card.Text>
                <div style={{textAlign:"right",marginTop:"-10px"}}><button type="button" className="btn-close" onClick={() => {borrarPost(val.titulo_post)}}></button></div>
                
            </Card.Body>
            </Card>
            )})
      }
          
    </>
  )

}

export default Blog;

const styles = {
  fecha: {
      fontFamily:"Comfortaa",
      fontSize: "0.8rem",
      marginTop: "10px",
      color:"blue",
  },

  autor:{
      fontFamily:"Comfortaa",
      fontSize:"1rem",

  }
};