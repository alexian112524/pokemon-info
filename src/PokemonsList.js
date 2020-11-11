import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const PokemonsList = (props) => {
    return (
        <div className="PokemonsList">
            <div className="list">
                {props.pokemons.map(pokemon => (
                    <div className="list-element" key={pokemon.name}>
                        <Link to={{pathname: `/pokemon/${pokemon.name}`}} >{pokemon.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonsList;