import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';

const PokemonsList = (props) => {
    return (
        <div className="PokemonsList">
            {props.pokemons.map(pokemon => (
                <div className="pokemon" key={pokemon.name}>
                    <Link to={{pathname: `/pokemon/${pokemon.name}`}} >{pokemon.name}</Link>
                </div>
            ))}
        </div>
    );
};

export default PokemonsList;