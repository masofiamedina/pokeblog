import React, { Component } from 'react'
import Pokemon from './Pokemon';

class Resultado extends Component {
    
    mostrarPokemon = () => {

        const pokemon = this.props.pokemon;

        if(pokemon.length === 0) return null;
        console.log(pokemon);

        return (
            <React.Fragment>
                <div className="col-12 p-5 row">
                    <Pokemon pokemon={pokemon} />
                </div>
            </React.Fragment>
        )
    } 

    render () {
        return( 
            <React.Fragment>
            {this.mostrarPokemon()}
            </React.Fragment>
        );
    }
}

export default Resultado;