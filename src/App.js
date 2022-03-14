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
      //const { isAuthenticated } = useAuth0()

      return (
        <div className="app container" style={{backgroundImage:`url(${fondo})`}}>
          
            <div class="row">
              <div class="col-12">
                <div class="jumbotron">
                  <img src={cabecera} className="img-fluid" alt="cabecera"  />
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-sm-8 text-center">
                <div className="jumbotron">
                <div style={styles.h3}>Poké-Blog!</div>
                <Blog/>
                </div>
              </div>

              <div class="col-sm-4">
                <div className="jumbotron">
                <div style={styles.h4}>Entrenador Pokémon</div>
                  <Registro/> <Login/>
          <br></br>
                  

                  <div style={styles.h4}>Buscar Pokémon!</div>
                    <Buscador datosBusqueda={this.datosBusqueda} />
                      <Resultado pokemon={this.state.pokemon} />
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

//{isAuthenticated ? <LogoutButton/> : <LoginButton/>}


const styles = {
  h4: {
      fontFamily:"Righteous",
      fontSize: "2rem",
      textAlign: "center",
      marginTop: "10px"
  },

  h3: {
    fontFamily:"Righteous",
    fontSize: "4rem",
    textAlign: "center",
    marginTop: "-25px",
}
};