import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Types = () => {
    const [types, setTypes] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type")
        .then(res => res.json())
        .then(
            (result) => {
                setTypes(result.results);
                setIsLoading(false);
            },
            (error) => {
                setError(true);
                setIsLoading(false);
            }
        )
        
    }, []);

    if(error) {
        return (
            <div className="Types full-component">
                <h1>{error}</h1>
            </div>
        );
    }
    else if(isLoading) {
        return (
            <div className="Types full-component">
                <h1>Chargement...</h1>
            </div>
        );
    }
    else {
        return (
            <div className="Types full-component">
                <h1 className="welcome-title">Types</h1>

                <div className="list">
                    {types.map(type => (
                        <div className="list-element" key={type.name}>
                            <Link to={{pathname: `/type/${type.name}`}} >{type.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Types;