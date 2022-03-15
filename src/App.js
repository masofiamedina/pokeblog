import './App.css';
import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import Twitter from './componentes/Twitter';
import Login from './componentes/Login';
import Blog from './componentes/Blog';
import Registro from './componentes/Registro';

class App extends Component {

    state = {
        termino: '',
        pokemon : []
    }

    consultarApi = () => {
      const termino = this.state.termino;
      const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;

      //console.log(url);

      fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => this.setState({ pokemon : resultado}))
    }

    datosBusqueda = (termino) => {
      this.setState({
        termino
      }, () => {
        this.consultarApi();
      })
    }

    render() {

      const fondo = require("./assets/imagenfondo.jpeg")
      const cabecera = require("./assets/cabecera.jpg")
  

      return (
        <div className="app container" style={{backgroundImage:`url(${fondo})`}}>
          
            <div className="row">
              <div className="col-12">
                <div className="jumbotron">
                  <img src={cabecera} className="img-fluid" alt="cabecera"  />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-sm-8 text-center">
                <div className="jumbotron">
                <div style={styles.h3}>Pokéblog!</div>
                <Blog/>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="jumbotron">
                <div style={styles.h4}>Entrenador Pokémon</div>
                <div style={styles.centrar}><Registro/> <Login/></div>
                  
          <br></br>
                  

                  <div style={styles.h4}>Buscar Pokémon!</div>
                    <Buscador datosBusqueda={this.datosBusqueda} />
                    <div style={styles.centrar}><Resultado pokemon={this.state.pokemon} /></div>
                      <br></br>
                  <div style={styles.h4}>Poké-Noticias!</div>
                    <Twitter />
                </div>
              </div>

            </div>
          
       </div>

      );

    }

}

export default App;


const styles = {
  h4: {
      fontFamily:"Righteous",
      fontSize: "2rem",
      textAlign: "center",
      marginTop: "10px",
  },

  h3: {
    fontFamily:"Righteous",
    fontSize: "4rem",
    textAlign: "center",
    marginTop: "-25px",
},

  centrar: {
    textAlign: "center",
  },


};