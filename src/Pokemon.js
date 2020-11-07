import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pokemon = (props) => {
    const { name } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+name)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(result);
                    setAbilities(result.abilities);
                    setTypes(result.types);
                    setHeight(result.height);
                    setWidth(result.width);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [] 
    );

    if(error) {
        return (
            <div className="Pokemon">
                <h1>Erreur: {error.message}</h1>
            </div>
        );
    }
    else if(!isLoaded) {
        return (
            <div className="Pokemon">
                <h1>Chargement...</h1>
            </div>
        );
    }
    else {
        return (
            <div className="Pokemon">
                <h1>{name}</h1>
            </div>
        );
    }
};

export default Pokemon;