import React from 'react';

const Pokemon = (props) => {
    
    const {name,id,sprites: {front_default}} = props.pokemon;
    
    return(
        <div className="row">
            <div className="col-4">
                    <img src={front_default} alt={name} style={styles.fotoPokemon} />  
             </div>
             <div className="col-8" style={styles.atributos}>
                    <p>{name}</p>
                    <p>Pokédex: #{id}</p>
            </div>
        </div>
    )   
} 

export default Pokemon;


/// si no escribo nada todo desaparece 


const styles = {
    fotoPokemon: {
        border: "2px solid #dfdfdf",
        borderRight: "0px",
        borderRadius:"10px 0px 0px 10px",
        marginLeft:"-17px",
        height:"96px",
    },

    atributos: {
        padding: "15px",
        backgroundColor: "#fff",
        border: "2px solid #dfdfdf",
        borderLeft: "0px",
        height: "96px",
        fontFamily: "Ubuntu 10px",
        fontSize: "0.9rem",
        lineHeight:"0.9",
        borderRadius: "0px 10px 10px 0px",
        paddingTop: "25px",
        textTransform: "capitalize",
    },
    
  };
