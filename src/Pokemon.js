import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pokemon = (props) => {
    const { name } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [height, setHeight] = useState(-1);
    const [weight, setWeight] = useState(-1);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+name)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAbilities(result.abilities);
                    setTypes(result.types);
                    setHeight(result.height/10);
                    setWeight(result.weight/10);
                    setStats(result.stats);
                    console.log(abilities);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [] 
    );

    const capitalize = (value) => {
        return value.charAt(0).toUpperCase()+value.slice(1);
    }
    const reFormat = (value) => {
        return value.split('-').map(elem => capitalize(elem)).join(' ');
    }

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
                <h1 className="welcome-title">{capitalize(name)}</h1>
                
                <h3 className="physical-details-title">Physcal details</h3>
                <div className="physical-details">
                    <span>Height: {height} m</span>
                    <span>Weight: {weight} kg</span>
                </div>

                <h3 className="types-title">Type(s)</h3>
                <div className="types">
                    {types.map(element => (
                        <div className="type" key={element.type.name}>
                            {capitalize(element.type.name)}
                        </div>
                    ))}
                </div>

                <h3 className="base-stats-title">Base stats</h3>
                <div className="base-stats">
                    {stats.map(elem => (
                        <div className="base-stat" key={elem.stat.name}>
                            {reFormat(elem.stat.name)}: {elem.base_stat}
                        </div>
                    ))}
                </div>

                <h3 className="abilities-title">Abilities</h3>
                <div className="abilities">
                    {abilities.map(elem => (
                        <div className="ability" key={elem.ability.name}>
                            {capitalize(elem.ability.name)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Pokemon;