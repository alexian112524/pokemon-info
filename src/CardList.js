import React, { useState, useCallback } from 'react';

const CardList = (props) => {
    return (
        <div className="CardList">
            <ul>
                {props.pokemons.map(pokemon => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CardList;